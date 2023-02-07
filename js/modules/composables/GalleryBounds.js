import {animateGalleryPosition} from "./MovableGallery.js"

function grabMostLeftBubble() {
    return document.querySelector('.row:nth-child(2)').querySelector('.bubble:first-child')
}

function grabTopRightBubble() {
    return document.querySelector('.row:first-child').querySelector('.bubble:last-child')
}

function grabBottomLeftBubble() {
    return document.querySelector('.row:last-child')
}

export function checkGalleryBoundary() {
    const mostLeftBubbleRect = grabMostLeftBubble().getBoundingClientRect()
    const topRightBubbleRect = grabTopRightBubble().getBoundingClientRect()
    const bottomLeftBubbleRect = grabBottomLeftBubble().getBoundingClientRect()

    let moveHorizontal = 0
    let moveVertical = 0

    if (topRightBubbleRect.right < window.innerWidth) {
        moveHorizontal = window.innerWidth - topRightBubbleRect.right
    }

    if (topRightBubbleRect.y > 0) {
        moveVertical = topRightBubbleRect.y * -1
    }

    if (mostLeftBubbleRect.left > 0) {
        moveHorizontal = mostLeftBubbleRect.left * -1
    }

    if (window.outerHeight - bottomLeftBubbleRect.height > bottomLeftBubbleRect.top) {
        moveVertical = (window.outerHeight - bottomLeftBubbleRect.height) - bottomLeftBubbleRect.top
    }

    animateGalleryPosition(moveHorizontal, moveVertical)

    return moveHorizontal || moveVertical
}
