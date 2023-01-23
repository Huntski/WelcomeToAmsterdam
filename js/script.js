import shops from './shops.js'
import {BubbleInterface} from "./modules/bubbles.js"

const galleryInterface = new BubbleInterface('gallery', shops)

// const gallery = document.getElementById('gallery')
// const rows = []
//
// for (let i = 0; i < 5; i++) {
//     createRow([createBubble(), createBubble(), createBubble(), createBubble()])
// }
//
// export function generateBubbleInterface() {
//     const bubblesAmount = 30
//     const bubblesLimit = 7
//
//     for (let i = 0; i < bubblesAmount; i++) {
//
//         for (let a = 0; a < rows.length; a++) {
//             if (rows[a].bubblesAmount > bubblesLimit && rows[a+1] === undefined) {
//                 createRow([createBubble()])
//             }
//
//             if (rows[a].bubblesAmount > bubblesLimit) {
//                 continue
//             }
//
//             addBubble(rows[a], createBubble())
//             break
//         }
//
//     }
// }
//
// generateBubbleInterface()
//
// function addBubble(row, bubble) {
//     row.element.append(bubble)
//     row.bubblesAmount++
// }
//
// function createBubble() {
//     const element = document.createElement('div')
//     element.classList.add('bubble')
//
//     return element
// }
//
// function createRow(bubbles) {
//     // Create row element.
//     const rowElement = document.createElement('div')
//     rowElement.classList.add('row')
//
//     // Create row object to row list.
//     const row = {
//         element: rowElement,
//         bubblesAmount: 0
//     }
//
//     // Add bubbles to new row element.
//     bubbles.forEach(bubble => {
//         addBubble(row, bubble)
//     })
//
//     // Add row element to gallery.
//     gallery.appendChild(rowElement)
//
//     rows.push(row)
// }
//
// function grabCenterBubble() {
//     const centerRow = rows[Math.round((rows.length - 1) / 2)]
//
//     const bubbles = centerRow.element.getElementsByClassName('bubble')
//
//     return bubbles[Math.round((bubbles.length - 1) / 2)]
// }
//
// const centerElement = grabCenterBubble()
//
// centerElement.style.backgroundColor = 'green'
//
// /**
//  * Moving the gallery around.
//  */
//
// let xMouseDownAt = 0
// let yMouseDownAt = 0
//
// let xPosition = 0
// let yPosition = 0
//
// let moveX
// let moveY
//
// let mouseDown
//
// gallery.onmousedown = e => {
//     xMouseDownAt = e.clientX
//     yMouseDownAt = e.clientY
//     mouseDown = true
// }
//
// gallery.onmouseup = e => {
//     mouseDown = false
//     xPosition = moveX
//     yPosition = moveY
// }
//
// gallery.onmousemove = e => {
//     // Check if mouse is pressed down.
//     if (!mouseDown) return
//
//     const xDistance = e.clientX - xMouseDownAt
//     const yDistance = e.clientY - yMouseDownAt
//
//     moveX = xPosition + xDistance
//     moveY = yPosition + yDistance
//
//     // scaleBubblesWithSideOffset()
//
//     gallery.animate({
//         transform: `translate(${moveX}px, ${moveY}px)`
//     }, {
//         duration: 300,
//         fill: 'forwards'
//     })
// }
//
// const bubbles = document.querySelectorAll('.bubble')
//
// function scaleBubblesWithSideOffset() {
//     for (let i = 0; i < bubbles.length; i++) {
//         scaleElement(bubbles[i])
//     }
// }
//
// function scaleElement(element) {
//     const rect = element.getBoundingClientRect()
//
//     let percentage = 100
//     const gap = 30
//
//     if (rect.left < 50) {
//         percentage = 100 / (rect.width+gap) * (rect.width + rect.left)
//
//         if (percentage > 100) {
//             percentage = 100
//         }
//
//         if (percentage < 70) {
//             percentage = 70
//         }
//     }
//
//     if (rect.right < 50) {
//         percentage = 100 / (rect.width+gap) * (rect.width + rect.right)
//
//         if (percentage > 100) {
//             percentage = 100
//         }
//
//         if (percentage < 70) {
//             percentage = 70
//         }
//     }
//
//     element.animate({
//         transform: `scale(${percentage}%)`
//     }, {
//         fill: 'forwards'
//     })
//
//     return percentage
// }
