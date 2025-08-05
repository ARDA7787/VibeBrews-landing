import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChats, createChat } from '../api';
import { Chat as ChatType } from '../shared';

export default function Chats() {
  const nav = useNavigate();
  const [chats, setChats] = useState<ChatType[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    try {
      const list = await fetchChats();
      setChats(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const newChat = async () => {
    const { chatId } = await createChat();
    nav(`/chat/${chatId}`);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Your Chats</h2>
      <button onClick={newChat}>+ New Chat</button>
      {loading ? <p>Loading...</p> : (
        <ul>
          {chats.map(c => (
            <li key={c.id} style={{ margin: '0.5rem 0' }}>
              <a href={`/chat/${c.id}`}>Chat #{c.id}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
