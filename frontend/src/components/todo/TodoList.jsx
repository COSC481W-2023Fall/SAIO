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
        axios.get('http://localhost:8000/todo')
            .then(res => {
                setTodos(res.data)
            })
            .catch((err) => console.log(err));
    });
    //Adds a new task in the local
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        axios.post('http://localhost:8000/todo', { 'id': todo.id, 'text': todo.text, 'isCompleted': todo.isComplete, 'emial': todo.email })
            .then(res => console.log(res))
            .catch((err) => console.log(err));

    }
    //Deletes task from the local
    function deleteTodo(id) {
        axios.delete('http://localhost:8000/todo/${id}' )
            .then( res => console.log(res))
    }
    //Updates Task that was changed
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))

    }
    //Crosses out the task of a competed task
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)
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