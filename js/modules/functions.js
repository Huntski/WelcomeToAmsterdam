export function createMovableGallery(gallery) {
    console.log('create gallery')

    document.body.style.overflow = 'hidden'

    let yMouseDownAt = 0
    let xMouseDownAt = 0
    let xPosition = 0
    let yPosition = 0
    let moveX
    let moveY
    let mouseDown = false

    gallery.ontouchmove = touchMoveEvent
    gallery.ontouchstart = touchStartEvent
    gallery.ontouchend = touchEndEvent

    centerMostMiddleBubble()
    makeBubblesClickable()

    function touchStartEvent(e) {
        const touch = e.changedTouches[0]

        xMouseDownAt = touch.clientX
        yMouseDownAt = touch.clientY
    }

    function touchEndEvent(e) {
        xPosition = moveX
        yPosition = moveY

        centerMostMiddleBubble()
    }

    function touchMoveEvent(e) {
        const touch = e.changedTouches[0]

        const moveDistanceX = touch.clientX - xMouseDownAt
        const moveDistanceY = touch.clientY - yMouseDownAt

        console.log('touch move')

        animateGalleryPosition(moveDistanceX, moveDistanceY)
    }

    // function mouseDownEvent(e) {
    //     xMouseDownAt = e.clientX
    //     yMouseDownAt = e.clientY
    //     mouseDown = true
    // }

    // function mouseUpEvent(e) {
    //     mouseDown = false
    //     xPosition = moveX
    //     yPosition = moveY
    // }

    function mouseMoveEvent(e) {
        if (!mouseDown) return

        const moveDistanceX = e.clientX - xMouseDownAt
        const moveDistanceY = e.clientY - yMouseDownAt

        animateGalleryPosition(moveDistanceX, moveDistanceY)
    }

    function animateGalleryPosition(moveDistanceX, moveDistanceY) {
        // console.log(moveDistanceX, moveDistanceY)

        closeOpenBubbleElements()

        moveX = xPosition + moveDistanceX
        moveY = yPosition + moveDistanceY

        if (isNaN(moveX) || isNaN(moveY)) {
            console.log(xPosition, moveDistanceX)
            console.log(yPosition, moveDistanceY)
            console.log(moveX, moveY)
        }

        gallery.animate({
            transform: `translate(${moveX}px, ${moveY}px)`
        }, {
            duration: 0,
            fill: 'forwards'
        })
    }

    function grabBubbleCenterOfScreen() {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2

        const centerElement = document.elementFromPoint(centerX, centerY)

        if (centerElement.tagName === 'BUTTON') {
            return centerElement
        }
    }

    function moveBubbleToCenterOfScreen(bubble) {
        console.log(typeof bubble)

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

    function makeBubblesClickable() {
        const bubbles = document.querySelectorAll('.bubble')

        bubbles.forEach(bubble => {
            bubble.onclick = () => {
                // moveBubbleToCenterOfScreen(bubble)
                closeOpenBubbleElements()

                bubble.classList.add('open')
            }
        })
    }

    function centerMostMiddleBubble() {
        // const centerBubble = grabBubbleCenterOfScreen()

        // moveBubbleToCenterOfScreen(centerBubble)
    }
}

export function closeOpenBubbleElements() {
    document.querySelectorAll('.open').forEach(e => {

    })
}
