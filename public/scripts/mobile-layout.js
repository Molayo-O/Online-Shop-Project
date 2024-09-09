const mobileButtonNavigationElement = document.getElementById("mobile-nav-btn");
const mobileMenuElement = document.getElementById("mobile-nav-menu");
//Add Event listener to toggle display

function toggleNavMenu() {
    mobileMenuElement.classList.toggle('show');
}
mobileButtonNavigationElement.addEventListener('click', toggleNavMenu);