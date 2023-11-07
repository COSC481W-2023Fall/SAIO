import { useState, useEffect } from 'react';

import axios from 'axios';
import config from '../../config'

import Sidebar from "../../components/sidebar/Sidebar";
import NotesTitle from "../../components/notes/NotesTitle";
import NeighborContainer from "../../components/notes/NeighborContainer";
import NotesBody from "../../components/notes/NotesBody";

function Notes() {
    const [title, setTitle] = useState(null);
    const [adjacent, setAdjacent] = useState([]);
    const [text, setText] = useState(null);

    useEffect(() => {
        axios.get(`${config.apiUrl}/app/notes`, {
            headers: {
                "x-email": "s@s.com"
            }
        })
        .then(response => {
            console.debug(response.data);
            setTitle(response.data.title);
            setAdjacent(response.data.adjacent);
            setText(response.data.text);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []); // The empty dependency array ensures this effect runs only once on mount

    return (
        <div className="flex notes">
            <Sidebar/>
            <div className="flex flex-col ">
                <NotesTitle title={title}/>
                <NeighborContainer adjacent={adjacent}/>
                <NotesBody text={text}/>
            </div>
        </div>
    )
}

export default Notes