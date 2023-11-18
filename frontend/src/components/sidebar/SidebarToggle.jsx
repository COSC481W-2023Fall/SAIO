export default function SidebarToggle() {
    return (
        <div className="x-sidebar-toggle grid place-content-center w-8 h-8 -translate-x-4" onClick={toggleSidebar}>
            <img
                src="/images/icons/chevron.png"
                alt="Chevron" width="20px" heght="20px"
            />
        </div>
    )
}

let navtabs = null;

/* Changes the size of the navigation bar to hide/show it */
// Future stying: maybe we can instead move the bar instead of
// changing the size for a better animation?
function toggleSidebar(event) {
    if (navtabs == null) {
        navtabs = document.querySelector("#navtabs");
    }

    if (navtabs.style.width == "0px") {
        navtabs.style.width = "80px";
    }
    else {
        navtabs.style.width = "0px";
    }
}