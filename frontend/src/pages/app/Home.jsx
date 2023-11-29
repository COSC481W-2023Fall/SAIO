import Sidebar from "../../components/sidebar/Sidebar"
import { useNavigate } from "react-router-dom";
import { LuConstruction } from "react-icons/lu";

export default function Home() {

    return (
        <main id="main" className="x-background primaryBackground relative ease-in grid place-content-center h-full">
            {/* w-full h-full */}
            <div className="x-content-section secondaryBackground oppositeShadeColor theme-shadow theme-border-radius p-8 flex flex-col text-center">
                <h1>Pardon Our Dust!</h1>
                <h2>Home Page Under Construction</h2>
                <LuConstruction className="m-6 place-self-center h-44 w-44"/>
            </div>
        </main>
    )
}


