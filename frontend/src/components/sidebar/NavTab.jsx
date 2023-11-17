import { Link } from "react-router-dom";

export default function NavTab(props) {
    let iconSource = `/images/icons/apps/${props.appName}.png`;
    return (
        <div className="navtab">
            <Link to={"../../app/" + props.appName} relative="path">
                <img src={iconSource} alt={props.appName}/>
            </Link>
        </div>
    )
}