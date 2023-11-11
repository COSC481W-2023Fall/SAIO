import { Editor, EditorState, RichUtils, ContentState, Modifier } from "draft-js";
import { useState, useEffect } from "react";
import EditorButton from "./EditorButton";

export default function NotesBody(props) {
    // props.text
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        if (props.text != null) {
            setEditorState(EditorState.createWithContent(ContentState.createFromText(props.text)));
        }
    }, [props.text]);

    const onBold = () => {
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, 'BOLD')
        );
    };

    const onItalic = () => {
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, 'ITALIC')
        );
    };

    const handleTab = (event) => {
        event.preventDefault();
        const currentContent = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const newContent = Modifier.replaceText(currentContent, selection, "\t");
        const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
        setEditorState(newEditorState);
    };

    return (
        <div className="w-full bg-gray-600">
            <EditorButton name="B" onChange={onBold}/>
            <EditorButton name="I" onChange={onItalic}/>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                onTab={handleTab}
            />
        </div>
    )
}