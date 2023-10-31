/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Todo from './TodoItems'
import TodoForm from './TodoForm'
function TodoList() {
    //Stored veriables in local
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) return []
        return JSON.parse(localValue)
    })
    //pulls from local
    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos]

    )
    //Adds a new task in the local
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }
    //Deletes task from the local
    function deleteTodo(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
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