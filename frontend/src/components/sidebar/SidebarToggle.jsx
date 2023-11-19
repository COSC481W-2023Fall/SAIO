export default function SidebarToggle() {
    return (
        <div className="x-sidebar-toggle tertiaryBackground grid place-content-center w-8 h-8 -translate-x-4" onClick={toggleSidebar}>
            <img
                src="/images/icons/chevron.png"
                alt="Chevron" width="20px" heght="20px"
            />
        </div>
    )
}

let sidebar = document.getElementById("sidebar-onscreen");
let main = document.getElementById("main");

/* Changes the size of the navigation bar to hide/show it */
// Future stying: maybe we can instead move the bar instead of
// changing the size for a better animation?
function toggleSidebar(event) {
    if (sidebar == null) {
        sidebar = document.getElementById("sidebar-onscreen");
    }

    // resel because you need to upadte when switching between pages
    main = document.getElementById("main");

    if (sidebar.style.transform == "") {
        sidebar.style.transform = "translateX(-5em)";
        main.style.left = "0";
        main.style.width = "100%";

        console.log("going offscreen...");
        console.log(sidebar.style.transform);
        console.log(main.style.left);
        console.log(main.style.width);
    }
    else {
        sidebar.style.transform = "";
        main.style.left = "5em";
        main.style.width = "calc(100% - 75px)";

        console.log("coming onscreen...");
        console.log(sidebar.style.transform);
        console.log(main.style.left);
    }
}