import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const ok = await login(email, password);
      if (ok) {
        nav('/chats');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to the server. Please try again later.');
    }
  };
  return (
    <div style={{ maxWidth: 400, margin: '3rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
