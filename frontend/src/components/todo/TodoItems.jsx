/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import axios from 'axios';
//Function of the todo list
function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        date:''
    })
    //Updates the changed item
    const submitUpdate = value => {
        updateTodo(edit.id, value,edit.date)
        setEdit({
            id: null,
            value: '',
            date: ''
        }
        )
    }
    
    
    //Pulls the form for updating the item
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }
    //Displays the task in the local spot
    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text} Due: {todo.date}
            </div>
            <div className='icons'>
                <button onClick={() => removeTodo(todo.id)}
                    className='delete-btn'>Delete</button>
                <button onClick={() => setEdit({ id: todo.id, value: todo.text, date: todo.date })}
                    className='edit-btn'>Edit</button>
            </div>
        </div>

    ))
}
export default Todo