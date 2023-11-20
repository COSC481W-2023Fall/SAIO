/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Todo from './TodoItems'
import TodoForm from './TodoForm'
import axios from 'axios';
import config from '../../config'


function TodoList() {
    //Stored veriables in local
    const [todos, setTodos] = useState(() => [])
    //pulls from local
   
    useEffect(() => {
        axios.get(`${config.apiUrl}/todo`,{
            headers: {
                "x-email": "s@s.com"
            }
        })
            .then(res => {
                setTodos(res.data)
            })
            .catch((err) => console.log(err));
    },[]);
    //Adds a new task in the local
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        console.log(todo.id)
        axios.post(`${config.apiUrl}/todo`, { id: todo.id, text: todo.text, email: todo.email, isComplete: todo.isComplete })
            .then(res => console.log(res))
            .then(setTimeout(function () { window.location.reload() }, 500))
            .catch((err) => console.log(err));

    }
    //Deletes task from the local
    function deleteTodo(id) {
        console.log(id)
        axios.delete(`${config.apiUrl}/todo/${id}`)
            .then(res => { console.log(res); console.log(res.data) })
            .then(setTimeout(function () { window.location.reload() }, 500));
    }
    //Updates Task that was changed
    const updateTodo = (id, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }
        console.log(id)
        console.log(newValue.text)
        console.log(newValue.isComplete)
        axios.put(`${config.apiUrl}/todo/${id}`, { text: newValue.text,  isComplete: newValue.isComplete })
            .then(res => console.log(res))
            .then(setTimeout(function () { window.location.reload() }, 500))
            .catch((err) => console.log(err));

    }
    //Crosses out the task of a competed task
    const completeTodo = id => {
        todos.map(todo => {
            
            if (todo.id === id && todo.isComplete === false) {
                console.log(todo.id)
                axios.put(`${config.apiUrl}/todo/${id}`, {  text: todo.text, isComplete: true })
                    .then(res => console.log(res))
                    // .then(setTimeout(function () { window.location.reload() }, 500))
                    .catch((err) => console.log(err));
                    return
            }
            if (todo.id === id && todo.isComplete === true)
            {
                axios.put(`${config.apiUrl}/todo/${id}`, { text: todo.text, isComplete: false })
                    .then(res => console.log(res))
                    // .then(setTimeout(function () { window.location.reload() }, 500))
                    .catch((err) => console.log(err));

            }
            
        })
        
    }
    //Goes into other componetes
    return (
        <div>
            <h1>Task For Today</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos}
                completeTodo={completeTodo}
                removeTodo={deleteTodo}
                updateTodo={updateTodo} />
        </div>
           
       

    )
}
export default TodoList