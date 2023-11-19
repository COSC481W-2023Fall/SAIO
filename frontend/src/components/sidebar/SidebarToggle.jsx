export default function SidebarToggle() {
    return (
        <div id="sidebar-toggle" className="x-sidebar-toggle tertiaryBackground grid place-content-center" onClick={toggleSidebar}>
                <img
                    src="/images/icons/chevron.png"
                    alt="Chevron" width="20px" heght="20px"
                />
        </div>
    )
}

let sidebar = document.getElementById("sidebar");
let toggle = document.getElementById("sidebar-toggle");
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

    // reset because you need to upadte when switching between pages
    main = document.getElementById("main");

    if (sidebar.style.transform == "") {
        sidebar.style.transform = "translateX(-5em)";
        toggle.style.transform = "translateX(1em)";
        main.style.left = "0";
        main.style.width = "100%";
    }
    else {
        sidebar.style.transform = "";
        toggle.style.transform = "";
        main.style.left = "5em";
        main.style.width = "calc(100% - 75px)";
    }
}