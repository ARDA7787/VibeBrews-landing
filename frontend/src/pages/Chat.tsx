import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMessages, sendMessage, uploadPdf } from '../api';
import { Message } from '../shared';

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const chatId = Number(id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const loadMessages = async () => {
    if (!chatId) return;
    const msgs = await fetchMessages(chatId);
    setMessages(msgs);
  };

  useEffect(() => { loadMessages(); }, [chatId]);

  const onSend = async () => {
    if (!input.trim()) return;
    await sendMessage(chatId, input);
    setInput('');
    await loadMessages();
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadPdf(chatId, file);
    if (fileRef.current) fileRef.current.value = '';
    await loadMessages();
  };

  return (
    <div style={{ maxWidth: 700, margin: '1rem auto' }}>
      <h3>Chat #{chatId}</h3>
      <div style={{ border: '1px solid #ccc', height: 400, overflowY: 'auto', padding: '1rem' }}>
        {messages.map(m => (
          <div key={m.id} style={{ margin: '0.5rem 0' }}>
            <b>{m.role === 'agent' ? 'AI' : 'You'}:</b> {m.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <input
          style={{ width: '80%' }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onSend(); } }}
          placeholder="Type a message..."
        />
        <button onClick={onSend}>Send</button>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <input type="file" accept="application/pdf" ref={fileRef} onChange={onUpload} />
      </div>
    </div>
  );
}
