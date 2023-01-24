export function createMovableGallery(gallery) {
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

    gallery.onmousedown = mouseDownEvent
    gallery.onmousemove = mouseMoveEvent
    gallery.onmouseup = mouseUpEvent

    document.onkeydown = e => {
        if (e.code === 'Space') {
            centerMostMiddleBubble()
        }
    }

    function touchStartEvent(e) {
        console.log('Touch start event')

        const touch = e.changedTouches[0]

        xMouseDownAt = touch.clientX
        yMouseDownAt = touch.clientY
    }

    function touchEndEvent(e) {
        console.log('Touch end event')

        xPosition = moveX
        yPosition = moveY
    }

    function touchMoveEvent(e) {
        console.log('Mouse move event')

        const touch = e.changedTouches[0]

        console.log(touch)

        const moveDistanceX = touch.clientX - xMouseDownAt
        const moveDistanceY = touch.clientY - yMouseDownAt

        animateGalleryPosition(moveDistanceX, moveDistanceY)
    }

    function mouseDownEvent(e) {
        xMouseDownAt = e.clientX
        yMouseDownAt = e.clientY
        mouseDown = true
    }

    function mouseUpEvent(e) {
        mouseDown = false
        xPosition = moveX
        yPosition = moveY
    }

    function mouseMoveEvent(e) {
        console.log('Mouse down event')
        if (!mouseDown) return

        const moveDistanceX = e.clientX - xMouseDownAt
        const moveDistanceY = e.clientY - yMouseDownAt

        animateGalleryPosition(moveDistanceX, moveDistanceY)
    }

    function animateGalleryPosition(moveDistanceX, moveDistanceY) {
        moveX = xPosition + moveDistanceX
        moveY = yPosition + moveDistanceY

        console.log(moveX, moveY)

        gallery.animate({
            transform: `translate(${moveX}px, ${moveY}px)`
        }, {
            duration: 300,
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

    function centerMostMiddleBubble() {
        try {
            const centerBubble = grabBubbleCenterOfScreen()

            const rect = centerBubble.getBoundingClientRect()

            console.log(rect)
        } catch (e) {
            console.log(e)
        }
    }
}

export function closeOpenBubbleElements() {
    document.querySelectorAll('.open').forEach(e => {
        e.classList.remove('open')
    })
}
