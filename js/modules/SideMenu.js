const sideMenu = document.querySelector('.side-menu')
const hamburgerMenu = document.querySelector('.hamburger-button')
const closeButton = document.querySelector('.button-close')
const contentBlur = document.querySelector('.content-blur')

function openSideMenu() {
    sideMenu.dataset.open = "1"

    sideMenu.animate({
        transform: 'translateX(0%)'
    }, {
        duration: 150,
        fill: "forwards",
        easing: 'ease-out'
    })
}

function closeSideMenu() {
    sideMenu.dataset.open = "0"

    sideMenu.animate({
        transform: 'translateX(150%)'
    }, {
        duration: 200,
        fill: "forwards",
        easing: 'ease-out'
    })
}

export function createToggleSideMenuEvent() {
    hamburgerMenu.onclick = openSideMenu
    closeButton.onclick = closeSideMenu
    contentBlur.onclick = closeSideMenu
}
