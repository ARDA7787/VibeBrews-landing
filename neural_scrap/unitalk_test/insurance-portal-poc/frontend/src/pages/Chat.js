import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMessages, sendMessage, uploadPdf } from '../api';
export default function Chat() {
    const { id } = useParams();
    const chatId = Number(id);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const fileRef = useRef(null);
    const loadMessages = async () => {
        if (!chatId)
            return;
        setLoading(true);
        try {
            const msgs = await fetchMessages(chatId);
            setMessages(msgs);
        }
        catch (error) {
            console.error('Error loading messages:', error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => { loadMessages(); }, [chatId]);
    const onSend = async () => {
        if (!input.trim())
            return;
        await sendMessage(chatId, input);
        setInput('');
        await loadMessages();
    };
    const onUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        await uploadPdf(chatId, file);
        if (fileRef.current)
            fileRef.current.value = '';
        await loadMessages();
    };
    return (_jsxs("div", { style: { maxWidth: 700, margin: '1rem auto' }, children: [_jsxs("h3", { children: ["Chat #", chatId] }), _jsx("div", { style: { border: '1px solid #ccc', height: 400, overflowY: 'auto', padding: '1rem' }, children: loading ? (_jsx("div", { style: { margin: '0.5rem 0' }, children: "Loading messages..." })) : messages.length === 0 ? (_jsxs("div", { style: { margin: '0.5rem 0' }, children: [_jsx("b", { children: "AI:" }), " ", _jsx("b", { children: "Hello! I am your insurance assistant. How can I assist you today? Please tell me what you need." })] })) : (messages.map(m => (_jsxs("div", { style: { margin: '0.5rem 0' }, children: [_jsxs("b", { children: [m.role === 'agent' ? 'AI' : 'You', ":"] }), " ", m.content] }, m.id)))) }), _jsxs("div", { style: { marginTop: '1rem' }, children: [_jsx("input", { style: { width: '80%' }, value: input, onChange: e => setInput(e.target.value), onKeyDown: e => { if (e.key === 'Enter') {
                            e.preventDefault();
                            onSend();
                        } }, placeholder: "Type a message..." }), _jsx("button", { onClick: onSend, children: "Send" })] }), _jsx("div", { style: { marginTop: '0.5rem' }, children: _jsx("input", { type: "file", accept: "application/pdf", ref: fileRef, onChange: onUpload }) })] }));
}
