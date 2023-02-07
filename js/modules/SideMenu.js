const sideMenu = document.querySelector('.side-menu')
const hamburgerMenu = document.querySelector('.hamburger-button')
const closeButton = document.querySelector('.button-close')

function openSideMenu() {
    sideMenu.dataset.open = "1"
}

function closeSideMenu() {
    sideMenu.dataset.open = "0"
}

export function createToggleSideMenuEvent() {
    hamburgerMenu.onclick = openSideMenu
    closeButton.onclick = closeSideMenu
}
