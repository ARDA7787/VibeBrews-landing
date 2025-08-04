import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chats from './pages/Chats';
import Chat from './pages/Chat';
import { getToken } from './api';
export default function App() {
    const isAuthed = !!getToken();
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/", element: isAuthed ? _jsx(Navigate, { to: "/chats", replace: true }) : _jsx(Navigate, { to: "/login", replace: true }) }), _jsx(Route, { path: "/chats", element: _jsx(Chats, {}) }), _jsx(Route, { path: "/chat/:id", element: _jsx(Chat, {}) })] }));
}
