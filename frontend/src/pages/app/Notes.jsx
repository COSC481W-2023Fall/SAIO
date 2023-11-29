import { useState, useEffect } from 'react';
import { EditorState, convertFromRaw } from 'draft-js'
import axios from 'axios';
import config from '../../config'

import NotesTitle from "../../components/notes/NotesTitle";
import NeighborContainer from "../../components/notes/NeighborContainer";
import NotesBody from "../../components/notes/NotesBody";
import SaveButton from '../../components/notes/SaveButton';
import NewNoteButton from '../../components/notes/NewNoteButton';
import saveNote from '../../scripts/saveNote';
import { useParams } from 'react-router-dom';

// Import Theme Button
import ThemeButton from '../../components/ThemeButton';

export default function Notes(props) {
    let { noteId } = useParams();
    noteId = noteId == null? "": noteId;

    const [title, setTitle] = useState("Loading...");
    const [adjacent, setAdjacent] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        axios.get(`${config.apiUrl}/app/notes/${noteId}`, {
            headers: {
                "x-email": "s@s.com"
            }
        }).then(response => {
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
    }, [noteId]); // The empty dependency array ensures this effect runs only once on mount

    return (
        <main id="main" className="primaryBackground relative flex place-content-center p-6">
            <div className="flex w-5/6">
                <div className='secondaryBackground theme-shadow theme-border-radius p-3 mr-3 w-full h-fit min-h-full'>
                    <div className='flex content-center'>
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
                    </div>
                    <NotesBody
                        editorState={editorState}
                        setEditorState={setEditorState}
                    />
                </div>
                <div className='secondaryBackground theme-shadow theme-border theme-border-radius w-1/3 h-fit min-h-full p-3'>
                    <NewNoteButton
                        noteId={noteId}
                        adjacent={adjacent}
                        setAdjacent={setAdjacent}
                    />
                    <NeighborContainer
                            adjacent={adjacent}
                    />
                </div>
            </div>
        </main>
    )
}