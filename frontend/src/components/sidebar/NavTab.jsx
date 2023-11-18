import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavTab(props) {
    const iconSource = `/images/icons/apps/${props.appName}.png`;
    const [active, setActive] = useState("x-inactive-navtab");
    return (
        <div className={active}>
            <NavLink
                to={"/app/" + props.appName}
                className={({isActive}) => 
                    setActive(isActive?"x-active-navtab":"x-inactive-navtab")
                }
            >
                <img className="w-24" src={iconSource} alt={props.appName}/>
            </NavLink>
        </div>
    )
}