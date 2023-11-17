import { NavLink } from "react-router-dom";

export default function NavTab(props) {
    let iconSource = `/images/icons/apps/${props.appName}.png`;
    return (
        <>
            <NavLink
                to={"/app/" + props.appName}
                className={({isActive}) => {console.log(isActive); return isActive? "bg-emerald-700" : "bg-yellow-200"} }
            >
                <img src={iconSource} alt={props.appName}/>
            </NavLink>
        </>
    )
}