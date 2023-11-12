export default function EditorButton(props) {
    return (
        <button
            className="p-3 bg-gray-100"
            onClick={props.onChange}
        >{props.name}</button>
    )
}