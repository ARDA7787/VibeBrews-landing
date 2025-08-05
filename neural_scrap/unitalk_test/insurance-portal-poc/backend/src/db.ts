import sqlite3 from 'sqlite3';
import path from 'path';
import { open, Database } from 'sqlite';

sqlite3.verbose();

const DB_PATH = path.resolve(process.cwd(), 'data', 'portal.db');

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function getDB(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (!db) {
    db = await open({ filename: DB_PATH, driver: sqlite3.Database });
    await initialise();
  }
  return db;
}

async function initialise() {
  // Users
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
  );`);

  // Applications
  await db.exec(`CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
  );`);

  // Chats (1-to-1 mapping with applications for now)
  await db.exec(`CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(application_id) REFERENCES applications(id)
  );`);

  // Messages
  await db.exec(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER,
      role TEXT,                -- 'user' | 'agent'
      content TEXT,
      tokens_used INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(chat_id) REFERENCES chats(id)
  );`);

  // Documents
  await db.exec(`CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER,
      filename TEXT,
      filepath TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(chat_id) REFERENCES chats(id)
  );`);
}
