import { BiSolidChevronLeft } from "react-icons/bi";

export default function SidebarToggle() {
    return (
        <div id="sidebar-toggle" className="x-sidebar-toggle tertiaryBackground theme-shadow grid place-content-center" onClick={toggleSidebar}>
            <div id="toggle-icon" onTransitionEnd={handleToggleTransitionEnd}>
                <BiSolidChevronLeft className="oppositeShadeColor"/>
            </div>
        </div>
    )
}

let sidebar = document.getElementById("sidebar");
let toggle = document.getElementById("sidebar-toggle");
let toggleIcon = document.getElementById("toggle-icon");
let main = document.getElementById("main");

/* Changes the size of the navigation bar to hide/show it */
// Future stying: maybe we can instead move the bar instead of
// changing the size for a better animation?
function toggleSidebar(event) {
    console.log("toggle");
    if (sidebar == null) {
        sidebar = document.getElementById("sidebar");
    }
    if (toggle == null) {
        toggle = document.getElementById("sidebar-toggle");
    }
    if (toggleIcon == null) {
        toggleIcon = document.getElementById("toggle-icon");
    }

    // reset because you need to upadte when switching between pages
    main = document.getElementById("main");

    if (sidebar.style.transform == "") {
        sidebar.style.transform = "translateX(-5em)";
        toggle.style.transform = "translateX(1em)";
        toggleIcon.style.transform = "rotate(0.5turn)";
        main.style.left = "0";
        main.style.width = "100%";
    }
    else {
        sidebar.style.transform = "";
        toggle.style.transform = "";
        toggleIcon.style.transform = "rotate(1turn)";
        main.style.left = "5em";
        main.style.width = "calc(100% - 5em)";
    }
}

function handleToggleTransitionEnd(event) {
    if (event.target.style.transform === "rotate(1turn)") {
        event.target.style.transition = "none";
        setTimeout(() => {
            event.target.style.transform = "rotate(0turn)";
            setTimeout(() => {
                event.target.style.transition = "all 0.5s ease-in";  
            }, 25);
        }, 25);
    }
}