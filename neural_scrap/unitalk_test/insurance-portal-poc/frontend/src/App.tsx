import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chats from './pages/Chats';
import Chat from './pages/Chat';
import { getToken } from './api';

export default function App() {
  const isAuthed = !!getToken();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isAuthed ? <Navigate to="/chats" replace /> : <Navigate to="/login" replace />}
      />
      <Route path="/chats" element={<Chats />} />
      <Route path="/chat/:id" element={<Chat />} />
    </Routes>
  );
}
