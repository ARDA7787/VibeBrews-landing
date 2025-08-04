import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getDB } from './db.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import { DatabaseTool } from './mcp/databaseTool';
import { DocumentProcessorTool } from './mcp/documentProcessorTool';
import { PolicyMatcherTool } from './mcp/policyMatcherTool';
import { ConversationManagerTool } from './mcp/conversationManagerTool';

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// Initialize MCP tools
const dbTool = new DatabaseTool();
const docTool = new DocumentProcessorTool();
const policyTool = new PolicyMatcherTool();
const convManager = new ConversationManagerTool(openai, dbTool, docTool, policyTool);

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-please';

// Enable CORS with dynamic origin (reflects request) and credentials
app.use(cors({
  origin: true,
  credentials: true
}));

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Static serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Multer setup for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  }
});
const upload = multer({ storage, fileFilter: (_req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(new Error('Only PDFs allowed'));
  }
  cb(null, true);
}});

//--------------------------------------------------
// Middleware
//--------------------------------------------------

interface AuthRequest extends express.Request { userId?: number; }

function authMiddleware(req: AuthRequest, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number };
    req.userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

//--------------------------------------------------
// Routes
//--------------------------------------------------

// Health
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// Auth
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const db = await getDB();
    
    // Try to find the user by email first
    let user = await db.get('SELECT * FROM users WHERE email = ?', email);

    // If the user does not exist, create a new one on-the-fly (dev convenience)
    if (!user) {
      console.log('Creating new user:', email);
      const result = await db.run('INSERT INTO users (email, password) VALUES (?, ?)', email, password);
      const userId = result.lastID as number;
      const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '8h' });
      return res.json({ token, created: true });
    }

    // If the user exists, validate the password
    if (user.password !== password) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User logged in:', email);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, created: false });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// List chats
app.get('/chats', authMiddleware, async (req: AuthRequest, res) => {
  const db = await getDB();
  const chats = await db.all('SELECT chats.* FROM chats JOIN applications ON chats.application_id = applications.id WHERE applications.user_id = ?', req.userId);
  res.json(chats);
});

// Create chat + application
app.post('/chats', authMiddleware, async (req: AuthRequest, res) => {
  const db = await getDB();
  const applicationId = uuidv4();
  await db.run('INSERT INTO applications (id, user_id) VALUES (?, ?)', applicationId, req.userId);
  const chatRes = await db.run('INSERT INTO chats (application_id) VALUES (?)', applicationId);
  const chatId = chatRes.lastID;
  // Initial agent greeting message
  await db.run('INSERT INTO messages (chat_id, role, content) VALUES (?, "agent", ?)', chatId, 'Hello! I am your insurance assistant. Let\'s get started with some details.');
  res.json({ chatId, applicationId });
});

// Get messages
app.get('/chats/:id/messages', authMiddleware, async (req: AuthRequest, res) => {
  const db = await getDB();
  const messages = await db.all('SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC', req.params.id);
  res.json(messages);
});

// Send message
app.post('/chats/:id/messages', authMiddleware, async (req: AuthRequest, res) => {
  const { content } = req.body;
  const chatId = parseInt(req.params.id, 10);
  try {
    const reply = await convManager.handleMessage(chatId, content);
    res.json({ status: 'ok', reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal error' });
  }
});

// Upload PDF
app.post('/chats/:id/upload', authMiddleware, upload.single('file'), async (req: AuthRequest, res) => {
  const chatId = req.params.id;
  const db = await getDB();
  const file = req.file!;
  await db.run('INSERT INTO documents (chat_id, filename, filepath) VALUES (?, ?, ?)', chatId, file.originalname, file.path);
  res.json({ url: `/uploads/${path.basename(file.path)}` });
});

//--------------------------------------------------
// Start server
//--------------------------------------------------
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
