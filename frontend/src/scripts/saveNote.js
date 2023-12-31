import axios from "axios";
import config from "../config";
import { convertToRaw } from "draft-js";

export default function saveNote(data) {
    // Send the current note to the server for saving it

    // serialize Draft.js Editor State
    const contentState = data.editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const text = rawContentState.blocks.map((block) => block.text).join('\n');

    axios.patch(`${config.apiUrl}/app/notes/${data.noteId}?x_email=${localStorage.getItem('token')}`, {
        "title": data.title,
        "adjacent": data.adjacent,
        "text": text,
        "raw_draft_content_state": rawContentState
    }).then((response) => {
       
    }).catch((reason) => {
        console.error("Could not save the note for some reason,");
    });
}