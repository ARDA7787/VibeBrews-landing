import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChats, createChat } from '../api';
export default function Chats() {
    const nav = useNavigate();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const load = async () => {
        setLoading(true);
        try {
            const list = await fetchChats();
            setChats(list);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => { load(); }, []);
    const newChat = async () => {
        const { chatId } = await createChat();
        nav(`/chat/${chatId}`);
    };
    return (_jsxs("div", { style: { maxWidth: 600, margin: '2rem auto' }, children: [_jsx("h2", { children: "Your Chats" }), _jsx("button", { onClick: newChat, children: "+ New Chat" }), loading ? _jsx("p", { children: "Loading..." }) : (_jsx("ul", { children: chats.map(c => (_jsx("li", { style: { margin: '0.5rem 0' }, children: _jsxs("a", { href: `/chat/${c.id}`, children: ["Chat #", c.id] }) }, c.id))) }))] }));
}
