import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(null); // State to store success message
  const [error, setError] = useState(null); // State to store error message
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    });

    if (res.ok) {
      setSuccess('Registration successful! Redirecting to login...');
      setError(null);  // Clear any previous error messages
      setTimeout(() => navigate('/login'), 2000);  // Redirect to login after 2 seconds
    } else {
      const data = await res.json();
      setError(data.message || 'Registration failed');
      setSuccess(null);  // Clear success message if there is an error
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {success && <p style={{ color: 'green' }}>{success}</p>}  {/* Success message */}

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Error message */}

      <form onSubmit={handleRegister}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
