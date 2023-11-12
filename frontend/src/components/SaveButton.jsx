// feel free to use this in other parts of the site!

export default function SaveButton(props) {
    const onClick = (event) => {
        props.onSave(props.saveData);
    };

    return (
        <button
            className="bg-green-200"
            onClick={onClick}
        >
            Save
        </button>
    )
}