/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
    //Stores the inputed value that was edited
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);
    //Focuses on the text input box
    useEffect(() => {
        inputRef.current.focus();
    });
    //handle the change of the entered data
    const handleChange = e => {
        setInput(e.target.value);
    };
    //handles the submition and stored data of the input
    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: (Math.floor(Math.random() * 1000000)),
            text: input,
            email: "s@s.com",
            isComplete:false

        });
        setInput('');
        
    };

    //Dysplays the item being updated
    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {props.edit ? (
                <>
                    <input
                        placeholder='Update your item'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        ref={inputRef}
                        className='todo-input edit'
                    />
                    <button onClick={handleSubmit} className='todo-button edit'>
                        Update
                    </button>
                </>
            ) : (
                //display the item to be created
                <>

                    <input
                        placeholder='Add a todo'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        className='todo-input'
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} className='todo-button'>
                        Add todo
                    </button>
                </>
            )}
        </form>
    );
}

export default TodoForm;