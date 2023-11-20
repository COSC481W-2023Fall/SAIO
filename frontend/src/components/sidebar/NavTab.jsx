import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavTab(props) {
    const iconSource = `/images/icons/apps/${props.appName}.png`;
    return (
        <NavLink
            to={"/app/" + props.appName}
            className={({isActive}) => {
                return isActive? "x-active-navtab primaryBackground":"x-inactive-navtab secondaryBackground";
            }}
        >
            <div className="navtab w-18 h-18 bg-inherit">
                <img className="w-full h-full object-contain;" src={iconSource} alt={props.appName}/>
            </div>
        </NavLink>
    )
}