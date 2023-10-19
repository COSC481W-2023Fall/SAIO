export default function SidebarToggle() {
    return (
        <div className="sidebar--toggle" onClick={toggleSidebar}>
            <img
                src="/images/icons/chevron.png"
                alt="Chevron" width="20px" heght="20px"
            />
        </div>
    )
}

/* Changes the size of the navigation bar to hide/show it */
// Future stying: maybe we can instead move the bar instead of
// changing the size for a better animation?
function toggleSidebar() {
    var navbar = document.querySelector(".sidebar--navbar");
    
    if (navbar.style.width == "0px") {
        navbar.style.width = "80px";
    }
    else {
        navbar.style.width = "0px";
    }
}