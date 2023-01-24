export class BubbleInterface {
    rows = []

    constructor(containerId = 'gallery', bubbles = []) {
        try {
            this.gallery = document.getElementById(containerId)

            this.createBubbleElementsWithRowsAndColumns(bubbles)
            this.createMovableGallery(this.gallery)
            this.animateFadeInBubbles()
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

    createMovableGallery() {
        document.body.style.overflow = 'hidden'

        const gallery = this.gallery

        let xMouseDownAt = 0
        let yMouseDownAt = 0

        let xPosition = 0
        let yPosition = 0

        let moveX
        let moveY

        let mouseDown

        document.body.onmousedown = e => {
            xMouseDownAt = e.clientX
            yMouseDownAt = e.clientY
            mouseDown = true
        }

        document.body.onmouseup = e => {
            mouseDown = false
            xPosition = moveX
            yPosition = moveY
        }

        document.body.ontouchstart = e => {
            const touch = e.changedTouches[0]

            xMouseDownAt = touch.clientX
            yMouseDownAt = touch.clientY
        }

        document.body.ontouchend = e => {
            xPosition = moveX
            yPosition = moveY
        }

        document.body.ontouchmove = e => {
            const touch = e.changedTouches[0]

            const xDistance = touch.clientX - xMouseDownAt
            const yDistance = touch.clientY - yMouseDownAt

            moveX = xPosition + xDistance
            moveY = yPosition + yDistance

            gallery.animate({
                transform: `translate(${moveX}px, ${moveY}px)`
            }, {
                duration: 300,
                fill: 'forwards'
            })
        }

        document.body.onmousemove = e => {
            if (!mouseDown) return

            const xDistance = e.clientX - xMouseDownAt
            const yDistance = e.clientY - yMouseDownAt

            moveX = xPosition + xDistance
            moveY = yPosition + yDistance

            gallery.animate({
                transform: `translate(${moveX}px, ${moveY}px)`
            }, {
                duration: 300,
                fill: 'forwards'
            })
        }
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
