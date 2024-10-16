import "../components/Todos.css";
import { useState } from "react";


const TodoForm = ({ onSubmit }) =>
{
    
    const [newTodoItem, setNewTodoItem] = useState("");
    const [itemPriority, setPriority] = useState("Low");

    function handleSubmit(e)
    {
        e.preventDefault();        

        if(newTodoItem === "") 
          return;

        onSubmit(newTodoItem, itemPriority); 

        setNewTodoItem("");   
        setPriority("Low")
    }    

    return(
      <> 

        <div className="header">
            <div >   
              <div className="input-container">              
                <input value={ newTodoItem } type="text" placeholder="Add New ToDo item" 
                  onChange={ e => setNewTodoItem(e.target.value) } />

              <div id="header-select"><label>Priority: </label>  
                <select className={ itemPriority } 
                  onChange={e => {setPriority(e.target.value);}}>
                  <option>Low</option>                  
                  <option>Medium</option>
                  <option>High</option>                  
                </select>
              </div>

                <button id="AddButton" onClick={ handleSubmit }> ADD </button>              
              </div>

            </div>  
        </div>

   
      </>
        
    );
}
    
export default TodoForm;