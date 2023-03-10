import {createMovableGallery, moveBubbleToCenterOfScreen} from "./composables/movablegallery.js"
import {usingMobileUserAgent} from "./composables/useragent.js"
import {CatBubblePopup} from "../components/catbubblepopup.js"
import {openBubblePopup} from "./composables/bubblepopup.js"
import {StoreBubblePopup} from "../components/storebubblepopup.js"

export class BubbleInterface {

    constructor(bubbles = []) {
        this.gallery = document.getElementById('gallery')
        this.rows = []

        try {
            this.createBubbleElementsWithRowsAndColumns(bubbles)
            this.animateFadeInBubbles()

            this.centerMostMiddleBubble()

            createMovableGallery()
        } catch (e) {
            console.log(e)
        }
    }

    createBubbleElementsWithRowsAndColumns(bubbles) {
        /**
         * Grab the square root of the amount of bubbles.
         * This will create more even rows and columns.
         */
        const bubblesLimitPerRow = Math.floor(Math.sqrt(bubbles.length))

        for (const key in bubbles) {
            let rowToAddBubbleTo = null

            if (!this.rows.length) {
                this.createRow([bubbles[key]])

                continue
            }

            for (let a = 0; a < this.rows.length; a++) {
                if (this.rows[a].bubblesAmount > bubblesLimitPerRow && this.rows[a + 1] === undefined) {
                    this.createRow()
                    rowToAddBubbleTo = this.rows[this.rows.length - 1]
                    break
                }

                if (this.rows[a].bubblesAmount > bubblesLimitPerRow) {
                    continue
                }

                rowToAddBubbleTo = this.rows[a]
                break
            }

            this.addBubble(rowToAddBubbleTo, this.createBubble(bubbles[key]))
        }
    }

    addBubble(row, element) {
        row.element.append(element)
        row.bubblesAmount++
    }

    createBubble(bubble = null) {
        const element = document.createElement('div')
        element.classList.add('bubble')

        let bubblePopupElement

        if (typeof bubble === 'object') {
            const shop_picture = './img/shops/' + bubble.pictures[0]
            element.style.backgroundImage = `url(${shop_picture})`

            bubblePopupElement = StoreBubblePopup(bubble)
        }  else {
            const picture = './img/cats/' + bubble
            element.style.backgroundImage = `url(${picture})`

            bubblePopupElement = CatBubblePopup(bubble)
        }

        const popupElement = bubblePopupElement

        element.onclick = e => {
            if (e.target === element) {
                openBubblePopup(popupElement)
                moveBubbleToCenterOfScreen(element)
            }
        }

        return element
    }

    createRow(bubbles = []) {
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')

        const row = {
            element: rowElement,
            bubblesAmount: 0
        }

        if (bubbles) {
            bubbles.forEach(bubble => {
                const bubbleElement = this.createBubble(bubble)

                this.addBubble(row, bubbleElement)
            })
        }

        this.gallery.appendChild(rowElement)

        this.rows.push(row)
    }

    centerMostMiddleBubble() {
        const centerRow = this.rows[Math.round((this.rows.length - 1) / 2)]
        const bubbles = centerRow.element.getElementsByClassName('bubble')
        const centerBubble = bubbles[Math.round((bubbles.length - 1) / 2)]

        moveBubbleToCenterOfScreen(centerBubble)
    }

    animateFadeInBubbles() {
        const bubbles = document.querySelectorAll('.bubble')

        if (usingMobileUserAgent()) {

        }

        // return bubbles.forEach(bubble => {
        //     bubble.style.opacity = "1"
        // })

        // const delayInMs = 3
        //
        // for (const key in bubbles) {
        //     // Should be integrated directly into the css later.
        //     if (typeof bubbles[key] === "object") {
        //         bubbles[key].style.animation = `bubbleFadeIn 400ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards ${delayInMs * (key + 1)}ms`
        //     }
        // }
    }

}
