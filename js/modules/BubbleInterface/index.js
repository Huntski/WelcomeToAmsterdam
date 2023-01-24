import {closeOpenBubbleElements, createMovableGallery} from "./functions.js"

export default class BubbleInterface {
    rows = []

    constructor(containerId = 'gallery', bubbles = []) {
        try {
            this.gallery = document.getElementById(containerId)

            this.createBubbleElementsWithRowsAndColumns(bubbles)
            this.animateFadeInBubbles()

            createMovableGallery(this.gallery)
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

            if (! this.rows.length) {
                this.createRow([bubbles[key]])

                continue
            }

            for (let a = 0; a < this.rows.length; a++) {
                if (this.rows[a].bubblesAmount > bubblesLimitPerRow && this.rows[a+1] === undefined) {
                    this.createRow()
                    rowToAddBubbleTo = this.rows[this.rows.length-1]
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
        const element = document.createElement('button')
        element.classList.add('bubble')

        element.innerHTML = `
            <div class="bubble__contents">
                <h1>Hello</h1>
                <div></div>
            </div>
        `

        element.onclick = e => {
            closeOpenBubbleElements()

            e.target.style.zIndex = '5'
            const bubbleContents = e.target.querySelector('.bubble__contents')

            if (bubbleContents) {
                bubbleContents.classList.add('open')
            }
        }

        if (typeof bubble === 'object') {
            element.style.backgroundImage = `url(${bubble.pictures[0]})`
        }

        if (typeof bubble === 'string') {
            element.style.backgroundImage = `url(${bubble})`
        }

        return element
    }

    createRow(bubbles = []) {
        // Create row element.
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')

        // Create row object to row list.
        const row = {
            element: rowElement,
            bubblesAmount: 0
        }

        // Add bubbles to new row element.
        if (bubbles) {
            bubbles.forEach(bubble => {
                const bubbleElement = this.createBubble(bubble)

                this.addBubble(row, bubbleElement)
            })
        }

        // Add row element to gallery.
        this.gallery.appendChild(rowElement)

        this.rows.push(row)
    }

    get centerBubble() {
        const centerRow = this.rows[Math.round((this.rows.length - 1) / 2)]
        const bubbles = centerRow.element.getElementsByClassName('bubble')
        return bubbles[Math.round((bubbles.length - 1) / 2)]
    }

    animateFadeInBubbles() {
        const bubbles = document.querySelectorAll('.bubble')
        const delayInMs = 3

        for (const key in bubbles) {
            // Should be integrated directly into the css later.
            if (typeof bubbles[key] === "object") {
                bubbles[key].style.animation = `bubbleFadeIn 400ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards ${delayInMs * (key + 1)}ms`
            }
        }
    }
}
