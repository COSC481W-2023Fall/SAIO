import NavTab from "./NavTab";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar() {
    return (
        <div className="sidebar secondaryBackground">
            <nav className="sidebar--navbar tertiaryBackground">
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
            </nav>
            <SidebarToggle/>
        </div>
    )
}