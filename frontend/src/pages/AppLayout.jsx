import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout(props) {
    return (
        <div className="flex">
            <Sidebar/>
            <Outlet/>
        </div>
    )
}