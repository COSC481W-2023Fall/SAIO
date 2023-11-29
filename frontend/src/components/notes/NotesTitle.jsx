export default function NotesTitle(props) {
    const onChange = (event) => {
        props.setTitle(event.target.value);
    };

    return (
        <textarea
            className="fourthBackground oppositeShadeColor w-full text-4xl resize-none w-fill h-14 mr-5 py-2"
            value={props.title}
            onChange={onChange}
        ></textarea>
    )
}