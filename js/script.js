import cats from './store/cats.js'
import shops from './store/shops.js'
import BubbleInterface from "./modules/BubbleInterface.js"
import {createToggleSideMenuEvent} from "./modules/SideMenu.js"

createToggleSideMenuEvent()

const gallery = document.querySelector('#gallery')

if (gallery) {
    if (gallery.dataset.resource === 'shops') {
        const galleryInterface = new BubbleInterface(shops)
    } else if (gallery.dataset.resource === 'cats') {
        const galleryInterface = new BubbleInterface(cats)
    }
}

