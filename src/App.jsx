import "./App.css"
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

import Signup from './components/pages/signup.jsx';
import Signin from './components/pages/signin.jsx';
import Home from "./components/pages/home.jsx";

const App = () => 
{
    const [isAuthenticated, setAuth] = useState(() => { return JSON.parse( localStorage.getItem("auth")) || { userId:0, username:"def", status:false} })
    const [users, setUsers] = useState([]);

    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(''); // Track input value for user ID

    const [editUserId, setEditUserId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');    

    useEffect(() => { fetchUsers(); }, []); // Run only once on component mount

    const fetchUsers = async () => 
    {
        try 
        {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        } 
        catch (error) { console.error('Error fetching users:', error); }
    };

    const fetchUser = async (id) => 
    {
        try 
        {
            const response = await axios.get(`http://localhost:3001/users/${id}`);
            setUser(response.data);
        } 
        catch (error) 
        {
            console.error('Error fetching user:', error);
            setUser(null);
        }
    }; 

    const updateUser = async (id) => 
    {
        try 
        {
            await axios.put(`http://localhost:3001/users/${id}`, {  name: editName, email: editEmail, password: editPassword });
            
            setEditUserId(null);
            setEditName('');
            setEditEmail('');
            setEditPassword('');
            setAuth(null);
            fetchUsers();
        } catch (error) { console.error('Error updating user:', error);  }
    };

    const deleteUser = async (id) => 
    {
        try 
        {
            await axios.delete(`http://localhost:3001/users/${id}`);

            fetchUsers();
        } 
        catch (error) { console.error('Error deleting user:', error);  }
    };

    const handleEditClick = (user) => 
    {        
        setEditUserId(user.id);
        setEditName(user.name);
        setEditEmail(user.email);
        setEditPassword(user.password);
    }; 


    return (
        <main>   
            <a href="#m_modal" className="close"><button > Admin </button></a>
            <Router>
                <Routes>
                    <Route path="/login" element={ <Signin users={ users } /> } />
                    <Route path="/register" element={ <Signup fetchUsers={ fetchUsers } /> } />
                    <Route path="/home" element={ (isAuthenticated.status || isAuthenticated !== null) ? 
                        <Home /> : <Navigate to="/login" />}
                    />
                    <Route path="*" element={<Navigate to="/login" />} /> 
                </Routes>
            </Router>  

            {/* <input type="checkbox" onChange={(e) => { setAut(e.target.value) } } /> Authenticate ?   */}

            <div id="m_modal" className="modal">
                <div className="content">
                    <a href="#" className="close"> <button> close </button> </a>	
                        
                    <div>
                        <div>
                            <label>Get User by ID </label>
                            <input type="number" placeholder="User ID" value={userId}
                                onChange={ (e) => setUserId(e.target.value) } />

                            <button onClick={ () => fetchUser(userId) }>Fetch User</button>
                            {
                                user && (
                                    <div>
                                        <h3>User Details</h3>
                                        <p>ID: {user.id}</p>
                                        <p>Name: {user.name}</p>
                                        <p>Email: {user.email}</p>
                                        <p>Password: {user.password}</p>
                                    </div>
                                )
                            }
                        </div>

                        <div>
                            <label>Delete User by ID </label>
                            <input type="number" placeholder="User ID"
                                onChange={(e) => setUserId(e.target.value)} />                
                            <button onClick={() => deleteUser(userId)}>Delete</button>
                        </div> 

                        <h1>Users</h1>
                        <ul>{
                            users.map(user => (
                                <li key={user.id}>
                                {
                                    editUserId === user.id ? 
                                    (
                                        <>
                                            <input type="text" value={editName}
                                                onChange={(e) => setEditName(e.target.value)} />

                                            <input type="email" value={editEmail}
                                                onChange={(e) => setEditEmail(e.target.value)} />

                                            <input type="password" value={editPassword}
                                                onChange={(e) => setEditPassword(e.target.value)} />
                                                
                                            <button onClick={() => updateUser(user.id)}>Update</button>
                                            <button onClick={() => setEditUserId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            {user.name} - {user.email}
                                            <button onClick={() => handleEditClick(user)}>Edit</button>
                                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                                        </>
                                    )
                                }</li>
                            ))
                        }</ul>

                    </div>
                        
                </div>               
		 
		    
		    </div>             
            
            
        </main>
    );
}


export default App;