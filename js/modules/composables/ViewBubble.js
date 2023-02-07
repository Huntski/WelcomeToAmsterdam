const gallery = document.getElementById('gallery')

export function openBubblePopup(popupElement) {
    const existingPopup = document.querySelector('.bubble-popup')

    if (existingPopup) {
        console.log('remove')
        existingPopup.remove()
    }

    gallery.parentNode.appendChild(popupElement)

    document.querySelector('.bubble-popup').animate({
        transform: `translateY(0)`
    }, {
        duration: 200,
        easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        fill: 'forwards'
    })
}

export function closeBubblePopup() {
    document.querySelector('.bubble-popup').animate({
        transform: `translateY(100%)`
    }, {
        duration: 200,
        easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        fill: 'forwards'
    })
}
