import Sidebar from "../sidebar/Sidebar";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Notes() {
    // Page Title
    useEffect(() => {
        document.title = "Note Page";
    }, []);

    // Test note variables
    const [id, setID] = useState('');
    const [note, setNote] = useState('');

    // CREATE-POST a note
    const addNoteHandler = () => {
        axios.post('TODO: Add backend URL', {
            'id': id,
            'note': note
        })
        .then(res => console.log(res))
    }

    // READ-GET a note
    useEffect(() => {
        axios.get('TODO: Add backend URL')
        .then(res => {
            setNote(res.data)
        })
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
                <Sidebar/>    
            </div>
            <div style={{ marginLeft: "25px", marginTop: "25px" }}>
                <h1>Note Taking Page</h1>
                <br />
                <form style={{ display: "flex", flexDirection: "column" }}>
                    <input 
                        type="text" 
                        onChange={event => setID(event.target.value)} placeholder="ID" 
                        style={{ 
                            marginBottom: "10px",
                            border: "1px solid black"
                        }}    
                    />
                    <input 
                        type="text" 
                        onChange={event => setNote(event.target.value)} placeholder="Note" 
                        style={{ 
                            marginBottom: "10px",
                            border: "1px solid black"
                        }} 
                    />
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={addNoteHandler}
                    >
                        Add Note
                    </button>
                </form>
                
                
                
            </div>
        </div>
    )
}