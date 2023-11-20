import { NavLink } from "react-router-dom";
import NavTab from "./NavTab";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar() {
    return (
        <div id="sidebar" className="primaryBackground x-sidebar-onscreen x-sidebar absolute flex basis-1/8">
            <nav id="navtabs" className="secondaryBackground x-navtabs h-screen w-20 flex flex-col">
                <NavTab
                    appName = "home"
                />
                <NavTab
                    appName = "todo"
                />
                <NavTab
                    appName = "calendar"
                />
                <NavTab
                    appName = "flashcards"
                />
                <NavTab
                    appName = "notes"
                />
                <NavTab
                    appName = "colorthemepalette"
                />
                <div className="x-inactive-navtab secondaryBackground w-full h-full">
                    {/* Filler div */}
                </div>
            </nav>
            <div className="grid place-content-center">
                <SidebarToggle/>
            </div>
        </div>
    )
}