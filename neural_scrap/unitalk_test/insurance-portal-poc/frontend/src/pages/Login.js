import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
export default function Login() {
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const onSubmit = async (e) => {
        e.preventDefault();
        const ok = await login(email, password);
        if (ok)
            nav('/chats');
        else
            setError('Invalid credentials');
    };
    return (_jsxs("div", { style: { maxWidth: 400, margin: '3rem auto' }, children: [_jsx("h2", { children: "Login" }), _jsxs("form", { onSubmit: onSubmit, children: [_jsx("input", { placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), style: { display: 'block', marginBottom: '1rem', width: '100%' } }), _jsx("input", { placeholder: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), style: { display: 'block', marginBottom: '1rem', width: '100%' } }), error && _jsx("div", { style: { color: 'red' }, children: error }), _jsx("button", { type: "submit", children: "Login" })] })] }));
}
