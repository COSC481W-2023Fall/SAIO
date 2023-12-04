import { NavLink } from "react-router-dom";
import { FaHome, FaCheckSquare, FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import { PiCalendarBlankFill   } from "react-icons/pi";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { BiSolidBookOpen } from "react-icons/bi";
import { CgStack } from "react-icons/cg";
import { MdQuiz } from "react-icons/md";
import { RiStackFill } from "react-icons/ri";
import { IoMdColorPalette } from "react-icons/io";
import NavTab from "./NavTab";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar() {
    return (
        <div id="sidebar" className="primaryBackground x-sidebar flex basis-1/8">
            <nav id="navtabs" className="secondaryBackground x-navtabs h-screen w-20 flex flex-col">
                <NavTab
                    appName = "home"
                >
                    <FaHome className="oppositeShadeColor w-16 h-16"/>
                </NavTab>
                <NavTab
                    appName = "todo"
                >
                    <RiCheckboxMultipleFill className="oppositeShadeColor w-16 h-16"/>
                </NavTab>
                <NavTab
                    appName = "calendar"
                >
                    <PiCalendarBlankFill   className="oppositeShadeColor w-16 h-16"/>
                </NavTab>
                <NavTab
                    appName = "flashcards"
                >
                    <CgStack className="oppositeShadeColor w-16 h-16"/>
                </NavTab>
                <NavTab
                    appName = "notes"
                >
                    <BiSolidBookOpen className="oppositeShadeColor w-16 h-16"/>
                </NavTab>
                <NavTab
                    appName = "colorthemepalette"
                >
                    <IoMdColorPalette className="oppositeShadeColor w-16 h-16"/>
                </NavTab>
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