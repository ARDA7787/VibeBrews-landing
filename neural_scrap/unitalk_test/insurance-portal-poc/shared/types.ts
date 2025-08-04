export interface User {
  id: number;
  email: string;
}

export interface Chat {
  id: number;
  application_id: string;
  created_at: string;
}

export interface Message {
  id: number;
  chat_id: number;
  role: 'user' | 'agent';
  content: string;
  created_at: string;
  tokens_used?: number;
}

export interface Application {
  id: string;
  user_id: number;
  created_at: string;
}
