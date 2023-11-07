/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Todo from './TodoItems'
import TodoForm from './TodoForm'
import axios from 'axios';
import config from '../../config'


function TodoList() {
    //Stored veriables in local
    const [todos, setTodos] = useState(() => {
        /*const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) return []
    return JSON.parse(localValue)
        */
    })
    //pulls from collection
    useEffect(() => {
        axios.get()
            .then(res => { setTodos(res.data) })
    }

    )
    //Adds a new task in the collection
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        axios.post(`${config.apiUrl}/todo`, { 'id': id, 'text': text })
            .then(res => console.log(res))
    }
    //Deletes task from the collection
    function deleteTodo(id) {
        axios.delete(`${config.apiUrl}/todo ${id}`).then(res => console.log(res.data))
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