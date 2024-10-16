import './log.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Signup = ({ fetchUsers }) => 
{ 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const navigate = useNavigate();

    const addUser = async () => 
    {
        try 
        {
            await axios.post('http://localhost:3001/users', { name, email, password });
            setName('');
            setEmail('');
            setPassword('');           
        
            fetchUsers();            

            navigate("/login")
            
        }catch (error) {   console.error('Error adding user:', error); }
    };

    return(
        <div className='form-container'>
            <form className='form' >
                <h2>Register</h2>

                <div className='input-group'>
                    <input type="text" placeholder="Name" value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <br></br>
                    <input type="email" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <br></br>
                    <input type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <button onClick={addUser}>Sign up</button>     
                <div className="reg-link"> 
                    <strong>Already have an account ? </strong>  
                    <a href='./login'> Login </a>
                </div>           
            </form>           
        </div>
    );

}

export default Signup;
