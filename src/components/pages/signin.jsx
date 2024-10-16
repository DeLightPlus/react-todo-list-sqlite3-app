import './log.css'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = ({ users }) =>
{    
    const [name, setName] = useState('');    
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    const [auth, setAuth] = useState(null);//
    
    const handleSignin = (e) =>
    {
        e.preventDefault();
        //console.log( users.length );

        for(let user in users)
        {
            if(users[user].name === name)
            {                
                //alert( users[i].name + " => 2 curname: " + curUser );
        
                if(password === users[user].password)
                {
                    setAuth(true);
                    
                    localStorage.setItem("auth", JSON.stringify({ userId: users[user].id, username: users[user].name, status: true }));
                    
                    navigate("/home");                  
                }   
            }           
        }  
    }

    return(
        <div className='form-container'>
            <form className='form' >
                <h2> Login  </h2>
                <div className='input-group'>
                    <input type="text" placeholder="Username"
                        onChange={(e) => setName(e.target.value)} />
                        <br></br>
                    <input type="password" placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} />
                        <br></br>
                </div>

                <div className="remember-forgot"> 
                    <div>
                        <input type='checkbox'/> <label>  Remember Me </label> </div> 
                    <a href='#'> Forgot password? </a>
                </div>
                
                <button type="submit" onClick={ handleSignin }> Login</button>
                <div className="reg-link"> 
                    <strong>Don't have an account ? </strong>  
                    <a href='./register'> Signup </a>
                </div>
            </form>           
        </div>
    )
}

export default Signin;