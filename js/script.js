const gallery = document.getElementById('gallery')
const rows = []

for (let i = 0; i < 5; i++) {
    createRow([createBubble(), createBubble(), createBubble(), createBubble()])
}

const bubblesAmount = 30
const bubblesLimit = 7
for (let i = 0; i < bubblesAmount; i++) {

    for (let a = 0; a < rows.length; a++) {
        if (rows[a].bubblesAmount > bubblesLimit && rows[a+1] === undefined) {
            createRow([createBubble()])
        }

        if (rows[a].bubblesAmount > bubblesLimit) {
            continue
        }

        addBubble(rows[a], createBubble())
        break
    }

}

/**
 * Add bubble to row object and increment the amount.
 * @param row
 * @param bubble
 * @return void
 */
function addBubble(row, bubble) {
    row.element.append(bubble)
    row.bubblesAmount++
}

/**
 * Create new bubble element with required data.
 * TODO: Make this element a clickable when in use.
 * @returns object
 */
function createBubble() {
    const element = document.createElement('div')
    element.classList.add('bubble')

    return element
}

/**
 * Create and add a new row to the gallery with bubbles.
 * @param bubbles
 * @return void
 */
function createRow(bubbles) {
    // Create row element.
    const rowElement = document.createElement('div')
    rowElement.classList.add('row')

    // Create row object to row list.
    const row = {
        element: rowElement,
        bubblesAmount: 0
    }

    // Add bubbles to new row element.
    bubbles.forEach(bubble => {
        addBubble(row, bubble)
    })

    // Add row element to gallery.
    gallery.appendChild(rowElement)

    rows.push(row)
}

/**
 * Grab the bubble most center of the screen.
 * @returns HTMLDivElement
 */
function grabCenterBubble() {
    const centerRow = rows[Math.round((rows.length - 1) / 2)]

    const bubbles = centerRow.element.getElementsByClassName('bubble')

    return bubbles[Math.round((bubbles.length - 1) / 2)]
}

const centerElement = grabCenterBubble()

centerElement.style.backgroundColor = 'green'

/**
 * Moving the gallery around.
 */

let xMouseDownAt = 0
let yMouseDownAt = 0

let xPosition = 0
let yPosition = 0

let moveX
let moveY

let mouseDown

gallery.onmousedown = e => {
    xMouseDownAt = e.clientX
    yMouseDownAt = e.clientY
    mouseDown = true
}

gallery.onmouseup = e => {
    mouseDown = false
    xPosition = moveX
    yPosition = moveY
}

gallery.onmousemove = e => {
    // Check if mouse is pressed down.
    if (!mouseDown) return

    const xDistance = e.clientX - xMouseDownAt
    const yDistance = e.clientY - yMouseDownAt

    moveX = xPosition + xDistance
    moveY = yPosition + yDistance

    // scaleBubblesWithSideOffset()

    gallery.animate({
        transform: `translate(${moveX}px, ${moveY}px)`
    }, {
        duration: 300,
        fill: 'forwards'
    })
}

const bubbles = document.querySelectorAll('.bubble')

function scaleBubblesWithSideOffset() {
    for (let i = 0; i < bubbles.length; i++) {
        scaleElement(bubbles[i])
    }
}

function scaleElement(element) {
    const rect = element.getBoundingClientRect()

    let percentage

    if (rect.left > 0) {
        percentage = 100
    } else {
        percentage = 100 / (rect.width+30) * (rect.width + rect.left)

        if (percentage > 100) {
            percentage = 100
        }

        if (percentage < 0) {
            percentage = 0
        }
    }

    element.animate({
        transform: `scale(${percentage}%)`
    }, {
        fill: 'forwards'
    })

    return percentage
}

// scaleBubblesWithSideOffset()

