import axios from "axios";
import config from "../../config";

export default function NewNoteButton(props) {
    const CreateNewNote = () => {
        axios.post(`${config.apiUrl}/app/notes`, {
            "adjacent": [props.noteId] // assigning this noteId as adjacent to new note
        }, {
            headers: {
                "x-email": "s@s.com"
            }
        }).then(response => {
            const newAdjacent = [...props.adjacent, response.data.note_id];
            props.setAdjacent(newAdjacent);
        }).catch(reason => {
            console.debug(reason);
        });
    };

    return (
        <button onClick={CreateNewNote}>
            +
        </button>
    )
}