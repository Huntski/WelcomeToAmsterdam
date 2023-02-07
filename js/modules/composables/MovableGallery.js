import {checkGalleryBoundary} from "./gallerybounds.js"

let xTouchStartAt = 0
let yTouchStartAt = 0
let xPosition = 0
let yPosition = 0
let moveX
let moveY
let gallery = document.getElementById('gallery')

export function createMovableGallery() {
    gallery.ontouchmove = touchMoveEvent
    gallery.ontouchstart = touchStartEvent
    gallery.ontouchend = touchEndEvent

    function touchStartEvent(e) {
        const touch = e.changedTouches[0]

        xTouchStartAt = touch.clientX
        yTouchStartAt = touch.clientY

        xPosition = moveX
        yPosition = moveY
    }

    function touchEndEvent(e) {
        xPosition = moveX
        yPosition = moveY

        checkGalleryBoundary()
    }

    function touchMoveEvent(e) {

        const touch = e.changedTouches[0]

        const moveDistanceX = touch.clientX - xTouchStartAt
        const moveDistanceY = touch.clientY - yTouchStartAt

        animateGalleryPosition(moveDistanceX, moveDistanceY)
    }
}

export function moveBubbleToCenterOfScreen(bubble) {
    try {
        const rect = bubble.getBoundingClientRect()

        const posX = rect.x + (rect.width / 2)
        const posY = rect.y + (rect.height / 2)

        const moveDistanceX = window.innerWidth / 2 - posX
        const moveDistanceY = window.innerHeight / 2 - posY

        console.log(moveDistanceX, moveDistanceY)

        animateGalleryPosition(moveDistanceX, moveDistanceY)
    } catch (e) {
        console.log(e)
    }
}

export function grabBubbleCenterOfScreen() {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    let centerElement = document.elementFromPoint(centerX, centerY)

    if (centerElement.className !== 'bubble') {
        centerElement = document.elementFromPoint(centerX-20, centerY-20)
    }

    if (centerElement.className === 'bubble') {
        return centerElement
    }
}

export function animateGalleryPosition(moveDistanceX, moveDistanceY) {
    moveX = xPosition + moveDistanceX
    moveY = yPosition + moveDistanceY

    gallery.animate({
        transform: `translate(${moveX}px, ${moveY}px)`
    }, {
        duration: 100,
        fill: 'forwards'
    })
}
