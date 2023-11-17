import { useState, useEffect } from 'react';
import { EditorState, convertFromRaw } from 'draft-js'
import axios from 'axios';
import config from '../../config'

import Sidebar from "../../components/sidebar/Sidebar";
import NotesTitle from "../../components/notes/NotesTitle";
import NeighborContainer from "../../components/notes/NeighborContainer";
import NotesBody from "../../components/notes/NotesBody";
import SaveButton from '../../components/SaveButton';
import NewNoteButton from '../../components/notes/NewNoteButton';
import saveNote from '../../scripts/saveNote';
import { useParams } from 'react-router-dom';

// Import Theme Button
import ThemeButton from '../../components/ThemeButton';

export default function Notes(props) {
    let paramNoteId = useParams().noteId;
    paramNoteId = paramNoteId == null? "": paramNoteId;

    const [noteId, setNoteId] = useState(paramNoteId);
    const [title, setTitle] = useState("Loading...");
    const [adjacent, setAdjacent] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        axios.get(`${config.apiUrl}/app/notes/${noteId}`, {
            headers: {
                "x-email": "s@s.com"
            }
        }).then(response => {
            setNoteId(response.data.note_id);
            setTitle(response.data.title);
            setAdjacent(response.data.adjacent);
            if (response.data.raw_draft_content_state != null) {
                setEditorState(EditorState.createWithContent(convertFromRaw(response.data.raw_draft_content_state)));
            }
            else {
                setEditorState(EditorState.createEmpty());
            }
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []); // The empty dependency array ensures this effect runs only once on mount

    return (
        <div className="flex notes primaryBackground">
            <Sidebar/>
            <div className="flex flex-col ">
                <NotesTitle title={title} setTitle={setTitle}/>
                <SaveButton
                    onSave={saveNote}
                    saveData={{
                        email: "s@s.com",
                        noteId: noteId,
                        title:  title,
                        adjacent: adjacent, // can't yet update
                        editorState: editorState
                    }}
                />
                <NewNoteButton
                    noteId={noteId}
                    adjacent={adjacent}
                    setAdjacent={setAdjacent}
                />
                <NeighborContainer
                    adjacent={adjacent}
                />
                <NotesBody
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
            </div>
            <ThemeButton />
        </div>
    )
}