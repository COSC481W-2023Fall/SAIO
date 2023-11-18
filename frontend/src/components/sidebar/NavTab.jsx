import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavTab(props) {
    const iconSource = `/images/icons/apps/${props.appName}.png`;
    const [active, setActive] = useState("x-inactive-navtab");
    return (
        <div className={active + " w-18 h-18"}>
            <NavLink
                to={"/app/" + props.appName}
                className={({isActive}) => {
                    // this func doesn't set the NavLink's className, it set's the parent's className 
                    // it does this because setting NavLink's className doesn't apply styling
                    setActive(isActive?"x-active-navtab primaryBackground":"x-inactive-navtab secondaryBackground")
                }}
            >
                <img className="w-full h-full object-contain;" src={iconSource} alt={props.appName}/>
            </NavLink>
        </div>
    )
}