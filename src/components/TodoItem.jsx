import { useState } from 'react';

const TodoItem = ({ id, userId, title, priority, completed, deleteTodoItem, handleEdit }) =>
{
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newPriority, setNewPriority] = useState(priority);
    const [newCompleteStatus, setNewCompleted] = useState(completed)

    const handleUpdate = () => 
    {
        console.log(newCompleteStatus? 1:0 + " completed " + newCompleteStatus);
        handleEdit(id, newTitle, newPriority, newCompleteStatus?1:0 );
        setIsEditing(false);
    }; 

    return(
        
        <li key={id}>
        {
            isEditing ? (
                <div id="item-editing">                   

                    <div id="item-text">
                        <input type="text" value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)} />
                        
                        <select className={ newPriority } id="priority" value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)} >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                        <div className='completed'>
                            <label>Completed </label>
                            <input id="check" type="checkbox" checked={ newCompleteStatus }
                                        onChange={(e) => setNewCompleted(e.target.checked)} />
                        </div>
                    </div>                    
                    
                    <div className="p-container"> 
                            <button onClick={ handleUpdate }>update</button>
                            <button onClick={() => setIsEditing(false)}> cancel </button>  
                    </div>
                    
                </div>
            ) : (
                
                <div id="item">                 

                    <div id="item-text">
                        <label style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                        {title +" "+ userId}
                        </label>
                    </div>                                      
                    
                    <div className="p-container" style={{ display: 'flex', flexDirection:'row', textAlign:'center' }}>  

                        <input id="check" type="checkbox" checked={ completed }
                            onChange={() =>  alert('click edit button if you want to set task-completion status') } />

                        <div>                             
                            <div className={priority} id="priority">  </div>
                        </div>  

                        <div style={{ display: 'flex', flexDirection:'column', textAlign:'center' }}>                            
                            <button id="edit" onClick={() => setIsEditing(true)}> Edit</button>
                            <button id="del" onClick={() => deleteTodoItem(id)}>Delete</button>
                        </div>

                        
                    </div> 

                </div>
            )
        }
        </li>
        
    )
}
    
export default TodoItem;