import NavTab from "./NavTab";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar() {
    return (
        <div className="tertiaryBackground x-sidebar flex basis-1/8">
            <nav id="navtabs" className="secondaryBackground x-navtabs h-full w-20 flex flex-col">
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
                <div className="x-inactive-navtab w-full h-full">
                    {/*Empty div for styling purposes*/}
                </div>
            </nav>
            <div className="grid place-content-center">
                <SidebarToggle/>
            </div>
        </div>
    )
}