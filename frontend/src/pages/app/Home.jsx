import Sidebar from "../../components/sidebar/Sidebar"

import ThemeButton from '../../components/ThemeButton';

export default function Home() {
    return (
        <div className="flex w-full primaryBackground x-background grid place-content-center w-full h-full">
            <div className="x-content-section secondaryBackground p-2 flex flex-col w-80 h-80 text-center">
                <h1>Pardon Our Dust!</h1>
                <h2>Home Page Under Construction</h2>
                <div className="grid place-content-center h-full">
                    <img className="place-self-center w-44" src="/images/icons/construction.png"></img>
                </div>
            </div>
            <ThemeButton />
        </div>
    )
}
