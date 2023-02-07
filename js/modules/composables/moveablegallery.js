import {moveBubbleBackToScreen} from "./gallerybounds.js"

let xTouchStartAt = 0
let yTouchStartAt = 0
let xPosition = 0
let yPosition = 0
let moveX
let moveY
let gallery = document.getElementById('gallery')

export function createMovableGallery() {
    document.body.style.overflow = 'hidden'

    document.ontouchmove = touchMoveEvent
    document.ontouchstart = touchStartEvent
    document.ontouchend = touchEndEvent

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

        moveBubbleBackToScreen()
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

        animateGalleryPosition(moveDistanceX, moveDistanceY)
    } catch (e) {
        console.log(e)
    }
}

export function grabBubbleCenterOfScreen() {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    const centerElement = document.elementFromPoint(centerX, centerY)

    if (centerElement.tagName === 'BUTTON') {
        return centerElement
    }
}

export function closeAllBubblePopups() {
    document.querySelectorAll('.bubble[data-active="1"]').forEach(element => {
        element.dataset.active = "0"
    })
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
