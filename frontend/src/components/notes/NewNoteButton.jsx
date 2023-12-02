import axios from "axios";
import config from "../../config";

export default function NewNoteButton(props) {
    const CreateNewNote = () => {
        axios.post(`${config.apiUrl}/app/notes?x_email=${localStorage.getItem('token')}`, {
            "adjacent": [props.noteId] // assigning this noteId as adjacent to new note
        }).then(response => {
            const newAdjacent = [...props.adjacent, response.data.note_id];
            props.setAdjacent(newAdjacent);
        }).catch(reason => {
            console.debug(reason);
        });
    };

    return (
        <button className="tertiaryBackground oppositeShadeColor w-full h-8 grid place-content-center" onClick={CreateNewNote}>
            +
        </button>
    )
}