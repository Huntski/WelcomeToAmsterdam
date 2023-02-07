import cats from './store/cats.js'
import shops from './store/shops.js'
import {BubbleInterface} from "./modules/bubbleinterface.js"
import {createToggleSideMenuEvent} from "./modules/sidemenu.js"

createToggleSideMenuEvent()

const gallery = document.querySelector('#gallery')

if (gallery) {
    if (gallery.dataset.resource === 'shops') {
        new BubbleInterface(shops)
    } else if (gallery.dataset.resource === 'cats') {
        new BubbleInterface(cats)
    }
}
