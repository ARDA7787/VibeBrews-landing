import { getDB } from '../db';

export class DatabaseTool {
  async saveMessage(chatId: number, role: 'user' | 'agent', content: string): Promise<void> {
    const db = await getDB();
    await db.run('INSERT INTO messages (chat_id, role, content) VALUES (?, ?, ?)', chatId, role, content);
  }

  async getMessages(chatId: number): Promise<{ role: 'user' | 'agent'; content: string }[]> {
    const db = await getDB();
    const rows: any[] = await db.all(
      'SELECT role, content FROM messages WHERE chat_id = ? ORDER BY created_at ASC',
      chatId
    );
    return rows.map(r => ({ role: r.role, content: r.content }));
  }

  async saveDocument(chatId: number, filename: string, filepath: string): Promise<void> {
    const db = await getDB();
    await db.run(
      'INSERT INTO documents (chat_id, filename, filepath) VALUES (?, ?, ?)',
      chatId,
      filename,
      filepath
    );
  }

  // Add additional database helper methods as needed
}
