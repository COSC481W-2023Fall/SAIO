/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Todo from './TodoItems'
import TodoForm from './TodoForm'
import axios from 'axios';
import config from '../../config'


function TodoList() {
    //Stored veriables in local
    const [todos, setTodos] = useState("")
    //pulls from collection
    useEffect(() => {
        axios.get(`${config.apiUrl}/todo`)
            .then(res => { setTodos(res.data) })
            .catch((err) => console.log(err));
    }

    )
    //Adds a new task in the collection
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        axios.post(`${config.apiUrl}/todo`, { 'id': todo.id, 'text': todo.text })
            .then(res => console.log(res))
            .catch((err) => console.log(err));
    }
    //Deletes task from the collection
    function deleteTodo(_id) {
        axios.delete(`${config.apiUrl}/todo ${_id}`).then(res => console.log(res.data))
            .catch((err) => console.log(err));
    }
    //Updates Task that was changed
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }
        //setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        axios.patch()

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