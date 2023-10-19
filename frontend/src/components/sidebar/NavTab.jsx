export default function NavTab(props) {
    let iconSource = `/images/icons/apps/${props.appName}.png`;
    return (
        <div className="navtab">
            <a href={"/app/" + props.appName}>
                <img src={iconSource} alt={props.appName}/>
            </a>
        </div>
    )
}