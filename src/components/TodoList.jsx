import "../components/Todos.css";
import { useState } from "react";
import  TodoItem  from "../components/TodoItem.jsx";

const TodoList = ({ todoList, deleteTodoItem, handleEdit }) =>
{
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => 
    {
        setSearchQuery(e.target.value);
    };

    const filteredTodoList = todoList.filter(
        todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="list-container"> 
            <input className="search" type="text" placeholder="Search( &#x1F50E; )"
                value={searchQuery} onChange={handleSearchChange} />
            <ul className='list'>
                {filteredTodoList.length === 0 && "No Todos"}
                {filteredTodoList.map(todo => {
                    return (
                        <TodoItem {...todo} key={todo.id}                            
                            deleteTodoItem={deleteTodoItem}
                            handleEdit={handleEdit}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default TodoList;