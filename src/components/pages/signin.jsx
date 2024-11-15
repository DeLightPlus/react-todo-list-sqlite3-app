import './log.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = ({ users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!email || !password) 
    {
      setError('All fields are required.');
      return;
    }

    // Compare password with hashed password
    const passwordMatch = await axios.post('http://localhost:3001/login', { email, password });

    if (passwordMatch.data.status) 
    {
        // console.log(JSON.stringify(passwordMatch.data));
        
        localStorage.setItem('auth', JSON.stringify(passwordMatch.data));
        navigate('/home');
    } 
    else 
    {
      setError('Incorrect password.');
    }
  };

  return (
    <div className='form-container'>
      <form className='form'>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <div className='input-group'>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Updated to email field
            /><br/>
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button type="submit" onClick={handleSignin}>Login</button>
        <div className="reg-link">
          <strong>Don't have an account?</strong>
          <a href='./register'>Signup</a>
        </div>
      </form>
    </div>
  );
};

export default Signin;
