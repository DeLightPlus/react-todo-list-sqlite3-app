import "../Todos.css"


import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import TodoForm from "../../components/TodoForm.jsx";
import TodoList from "../TodoList.jsx";
 
import axios from "axios";

const Home = () =>
{    
    
    const curUser = JSON.parse( localStorage.getItem("auth") );
    let userId = curUser.userId;

    const [todoList, setTodoList] = useState([]); 
    const [todo, setTodo] = useState(); 

    //const [editItemId, setEditItemId] = useState(null);
    //const [editUserId, setEditUserId] = useState(null);

    //const [editTitle, setEditTitle] = useState('');
    const [editPriority, setEditPriority] = useState('');
    //const [editCompleted, setEditCompleted] = useState('');  

    
    useEffect(() => { fetchTodoList(); }, []); // Run only once on component mount


    const fetchTodoList = async () => 
    {      
        try 
        {
            const response = await axios.get(`http://localhost:3001/todos/${userId}`);
            setTodoList(response.data);
        } 
        catch (error) { console.error('Error fetching todos:', error); }
    };
        
    const fetchTodo = async (id) => 
    {
        try 
        {
            const response = await axios.get(`http://localhost:3001/todos/${userId}/${id}`);
            setTodo(response.data);
        } 
        catch (error) 
        {
            console.error('Error fetching todo:', error);
            setTodo(null);
        }
    };    
          
    const addTodo = async (title, priority) =>
    {
        try
        {
            await axios.post(
                'http://localhost:3001/todos', { userId, title,  priority, completed: 0 });            
            fetchTodoList();
            
            // alert( curUser.username + " ,status: " + curUser.status); 
        
        }
        catch(error)
        {
            console.error('Error adding todo:', error);     
        }
    
    } 

    const handlePriority = async (id, priority) =>
    {               
        setEditPriority(priority)
        alert('PRIORITY? '+ priority+'/'+editPriority)        

        try 
        {
            await axios.put(` http://localhost:3001/todos/${userId}/${id} `, {  priority: editPriority  }); 
            fetchTodoList();
        } 
        catch (error) { console.error('Error updating todo priority status:', error);  }
    }
      
    const toggleTodo = async (id, completed) =>
    {
        fetchTodo(id);

        handleEdit(id, todo.title, todo.priority, completed);        
        
    }     

    const deleteTodoItem = async (id) => 
    {
        alert("trying to delete :id" + id)

        try 
        {
            await axios.delete(`http://localhost:3001/todos/${id}`);     
            fetchTodoList();
        } 
        catch (error) { console.error('Error deleting user:', error);  }
    };    
   

    const handleEdit = async (id, newText, newPriority, newCompleted) => 
    {
        try 
        {
            await axios.put(`http://localhost:3001/todos/${userId}/${id}`, 
                {  title: newText, priority: newPriority, completed: newCompleted });            
    
            fetchTodoList();

        } catch (error) { console.error('Error updating user:', error);  }
    };


    return(
        <div className="todo">
            <div className="Header-main"> 
                <h1>Welcome: { curUser.username } </h1>
                <div>
                   {/*  <button id="delAccButton"> <img src="{ DeleteAccIcon }" alt="X" /> </button>
                    <button id="logoutButton" type="button"
                        onClick={handleLogout}> <img src="{ LogoutIcon }" alt="<" /> </button> */}
                </div>      
            </div>      
            
        
            <div className="container">
                <h2>Add new Todo</h2>       
                <div className="todo-list-container">
                    <TodoForm onSubmit={ addTodo }  />
                    <h2>Todo List</h2>
                    <TodoList 
                        todoList={ todoList } 
                        
                        deleteTodoItem={ deleteTodoItem }
                        handleEdit={ handleEdit }
                    />
                </div>
            </div>

        </div>
    );
}

export default Home;