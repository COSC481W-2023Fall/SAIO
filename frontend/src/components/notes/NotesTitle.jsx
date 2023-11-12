export default function NotesTitle(props) {
    const onChange = (event) => {
        props.setTitle(event.target.value);
    };

    return (
        <textarea
            className="w-full bg-green-500 resize-none"
            value={props.title}
            onChange={onChange}
        ></textarea>
    )
}