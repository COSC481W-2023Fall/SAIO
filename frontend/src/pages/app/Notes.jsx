import Sidebar from "../../components/sidebar/Sidebar";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config'

function Notes() {
    // Page Title
    // useEffect(() => {
    //     document.title = "Note Page";
    // }, []);

    // Test note variables
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);

    // CREATE-POST a note
    const addStudentHandler = () => {
        axios.post(`${config.apiUrl}/student`, {
            'firstName': firstName,
            'lastName': lastName
        }).then(res => console.log(res))
        .catch((error) => {
            if(error.res) {
                console.log(error.res.data)
            }
        })
    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
                <Sidebar/>    
            </div>
            <div style={{ marginLeft: "25px", marginTop: "25px" }}>
                <h1>Note Taking Page</h1>
                <br />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input 
                        onChange={event => setFirstName(event.target.value)} placeholder="First Name" 
                        style={{ 
                            marginBottom: "10px",
                            border: "1px solid black"
                        }}    
                    />
                    <input 
                        onChange={event => setLastName(event.target.value)} placeholder="Last Name" 
                        style={{ 
                            marginBottom: "10px",
                            border: "1px solid black"
                        }} 
                    />
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={addStudentHandler}
                    >
                        Add Note
                    </button>
                </div>
                <div>
                    {}
                </div>
            </div>
        </div>
    )
}

export default Notes