import './log.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Post data to backend (password will be hashed server-side)
      await axios.post('http://localhost:3001/users', { name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      setError('');

      fetchUsers();
      navigate('/login');
    } catch (error) {
      setError('Error registering user. Please try again.');
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='form-container'>
      <form className='form'>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}

        <div className='input-group'>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={addUser}>Sign up</button>
        <div className="reg-link">
          <strong>Already have an account?</strong>
          <a href='./login'> Login </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
