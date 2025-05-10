import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null)

    try {
      const res = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      navigate('/api/shorten'); // Redirect to home or another page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='login'>
        <form onSubmit={handleLogin}>
      <h3>Login</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='labels'>
      <label htmlFor="">Email:</label>
      <input type="email" value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      required placeholder="Email" />
      </div>
      <div className='labels'>
      <label htmlFor="">Passwor:</label>
      <input type="password" value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      required placeholder="Password" />
      </div>
      <button type="submit" className='btn'>Login</button>
    </form>
    </div>
  );
}

export default Login;
