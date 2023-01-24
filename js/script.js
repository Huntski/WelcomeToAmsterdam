import shops from './shops.js'
import {BubbleInterface} from "./modules/bubbles.js"

const galleryInterface = new BubbleInterface('gallery', shops)
const sideMenu = document.querySelector('.side-menu')

function toggleSideMenu() {
    sideMenu.classList.toggle('active')
}

function createToggleSideMenuEvent() {
    const toggleElements = ['.hamburger-button', '.close-button', '.content-blur']

    toggleElements.forEach(selector => {
        const element = document.querySelector(selector)

        element.onclick = toggleSideMenu
    })
}

createToggleSideMenuEvent()
