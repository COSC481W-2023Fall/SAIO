import ThemeButton from "../components/ThemeButton";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout(props) {
    return (
        <div className="flex overflow-hidden">
            <Sidebar/>
            <Outlet/>
            <ThemeButton/>
        </div>
    )
}