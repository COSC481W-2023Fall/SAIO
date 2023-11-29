export default function EditorButton(props) {
    return (
        <button
            className="tertiaryBackground oppositeShadeColor h-3 w-3 grid place-content-center mr-1 mb-2"
            onClick={props.onChange}
        >{props.name}</button>
    )
}