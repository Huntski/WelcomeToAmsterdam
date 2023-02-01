import cats from './store/cats.js'
import shops from './store/shops.js'

import BubbleInterface from "./modules/BubbleInterface.js"

const gallery = document.querySelector('#gallery')

if (gallery) {
    if (gallery.dataset.resource === 'shops') {
        const bubbleInterface = new BubbleInterface(shops)
    } else if (gallery.dataset.resource === 'cats') {
        const galleryInterface = new BubbleInterface(cats)
        console.log(galleryInterface.rows)
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
