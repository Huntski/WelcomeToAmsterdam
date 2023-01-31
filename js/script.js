import cats from './modules/cats.js'
import shops from './modules/shops.js'

import BubbleInterface from "./modules/bubbleinterface.js"

const gallery = document.querySelector('#gallery')

if (gallery) {
    if (gallery.dataset.resource === 'shops') {
        new BubbleInterface(shops)
    } else if (gallery.dataset.resource === 'cats') {
        new BubbleInterface(cats)
    }
}

const sideMenu = document.querySelector('.side-menu')

function toggleSideMenu() {
    sideMenu.classList.toggle('active')
}

function createToggleSideMenuEvent() {
    const toggleElements = ['.hamburger-button', '.button-close', '.content-blur']

    toggleElements.forEach(selector => {
        const element = document.querySelector(selector)

        element.onclick = toggleSideMenu
    })
}

createToggleSideMenuEvent()
