import NavTab from "./NavTab";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar() {
    return (
        <div className="sidebar secondaryBackground">
            <nav className="sidebar--navbar primaryBackground">
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
            </nav>
            <SidebarToggle/>
        </div>
    )
}