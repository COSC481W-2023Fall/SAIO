import Sidebar from "../../components/sidebar/Sidebar"

import ThemeButton from '../../components/ThemeButton';

export default function Home() {
    
    return (
        <div className="flex home tertiaryBackground">
            <Sidebar/>
            <div className="flex flex-row ml-5 mt-5 text-center">
                <div className="mr-5 outline primaryBackground" style={{ height: "100px", width: "100px"}}>
                    <div className="sixthColor">Primary</div>
                </div>
                <div className="mr-5 outline secondaryBackground" style={{ height: "100px", width: "100px"}}>Secondary</div>
                <div className="mr-5 outline tertiaryBackground" style={{ height: "100px", width: "100px"}}>Tertiary</div>
                <div className="mr-5 outline fourthBackground" style={{ height: "100px", width: "100px"}}>Fourth</div>
                <div className="mr-5 outline fifthBackground" style={{ height: "100px", width: "100px"}}>Fifth</div>
                <div className="mr-5 outline sixthBackground" style={{ height: "100px", width: "100px"}}>Sixth</div>
            </div>
            <ThemeButton />
        </div>
    )
    }
