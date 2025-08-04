const API_BASE = 'http://localhost:4000';

export function getToken(): string | null {
  return localStorage.getItem('token');
}

function headers() {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

export async function login(email: string, password: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (res.ok) {
    const { token } = await res.json();
    localStorage.setItem('token', token);
    return true;
  }
  return false;
}

export async function fetchChats() {
  const res = await fetch(`${API_BASE}/chats`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to load chats');
  return res.json();
}

export async function createChat() {
  const res = await fetch(`${API_BASE}/chats`, {
    method: 'POST',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export async function fetchMessages(chatId: number) {
  const res = await fetch(`${API_BASE}/chats/${chatId}/messages`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export async function sendMessage(chatId: number, content: string) {
  const res = await fetch(`${API_BASE}/chats/${chatId}/messages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export async function uploadPdf(chatId: number, file: File) {
  const form = new FormData();
  form.append('file', file);
  const token = getToken();
  const res = await fetch(`${API_BASE}/chats/${chatId}/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}
