import NavTab from "./NavTab";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <nav className="sidebar--navbar">
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