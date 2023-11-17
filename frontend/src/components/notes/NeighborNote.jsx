import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import config from "../../config";

export default function NeighborNote(props) {
    const [neighborTitle, setNeighborTitle] = useState(null);
    useEffect(() => {
        /* Fetch this Note's Title when the ID is supplied */
        axios.get(`${config.apiUrl}/app/notes/${props.noteId}`, {
            headers: {
                "x-email": "s@s.com"
            }
        }).then(response => {
            setNeighborTitle(response.data.title);
        }).catch(ex => {
            console.error("Error when fetching data for neighbor: " + props.noteId);
        })
    }, []);

    return (
        <div className="flex justify-center rounded-md bg-blue-500 w-44 h-10 py-2 px-1 m-1">
            <p className="block w-full overflow-hidden whitespace-nowrap text-ellipsis">
                <Link to={`/app/notes/${props.noteId}`}>
                    {neighborTitle}
                </Link>
                {/* <a href={`/app/notes/${props.noteId}`}>{neighborTitle}</a> */}
            </p>
        </div>
    )
}