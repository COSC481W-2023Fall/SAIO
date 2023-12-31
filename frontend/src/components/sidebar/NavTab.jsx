import { NavLink } from "react-router-dom";

export default function NavTab(props) {
    return (
        <NavLink
            to={"/app/" + props.appName}
            className={({isActive}) => {
                return (isActive? "x-active-navtab primaryBackground":"x-inactive-navtab secondaryBackground");
            }}
        >
            <div className="x-navtab w-20 h-20 grid place-content-center">
                {props.children}
            </div>
        </NavLink>
    )
}