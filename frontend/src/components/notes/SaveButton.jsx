// feel free to use this in other parts of the site!

export default function SaveButton(props) {
    const onClick = (event) => {
        props.onSave(props.saveData);
    };

    return (
        <button
            className="tertiaryBackground oppositeShadeColor theme-border-radius w-24 h-full"
            onClick={onClick}
        >
            Save
        </button>
    )
}