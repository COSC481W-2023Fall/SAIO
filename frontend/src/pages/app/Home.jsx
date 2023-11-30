import { useState } from "react";

export default function Home() {
    const [name, setName] = useState("[Username]");

    return (
        <main id="main" className="x-background primaryBackground relative flex place-content-center items-center h-full">
            <div className="x-content-section secondaryBackground oppositeShadeColor theme-shadow theme-border-radius p-8 flex flex-col text-left w-3/5 h-fit">
                <div className="flex items-center  justify-between pb-6 m-0">
                    <h1 className="sixthColor text-6xl m-0">SAIO</h1>
                    <h1 className="p-0 m-0">Welcome back, {name}</h1>
                </div>

                <h2>Let's get started! <span className="sixthColor">SAIO</span> has calendar, to-do, flashcard, and notebook features. Click the icons on the sidebar to get started!</h2>

                <div className="tertiaryBackground theme-shadow theme-border-radius mt-10 p-6 text-left">
                    <div className="flex justify-between items-center">
                        <h2 className="pb-2">Update Your Info</h2>
                        <button className="sameShadeColor grid place-content-center h-8">Update</button>
                    </div>
                    <form action="submit" className="grid grid-flow-col justify-stretch">
                        <div className="flex flex-col pr-6">
                            <label htmlFor="fname">New First Name</label>
                            <input id="fname" type="text" className="sameShadeColor"/>
                            <label htmlFor="lname">New Last Name</label>
                            <input id="lname" type="text" className="sameShadeColor"/>
                            <label htmlFor="email">New Email Address</label>
                            <input id="email" type="text" className="sameShadeColor"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">New Password</label>
                            <input id="password" type="text" className="sameShadeColor"/>
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input id="confirm-password" type="text" className="sameShadeColor"/>
                        </div>
                    </form>
                </div>

                <div className="flex justify-end text-right">
                    <div className="tertiaryBackground theme-shadow theme-border-radius w-3/5 flex items-center justify-evenly p-3 mt-3">
                        <p className="w-1/2">Warning: Once your account is deleted, it cannot be recovered.</p>
                        <button className="oppositeShadeColor bg-red-500 h-8 grid place-content-center">Delete Account</button>
                </div>
                </div>
            </div>
        </main>
    )
}


