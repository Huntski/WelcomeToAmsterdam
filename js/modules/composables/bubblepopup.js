const gallery = document.getElementById('gallery')

export function openBubblePopup(popupElement) {
    const existingPopup = document.querySelector('.bubble-popup')

    if (existingPopup) {
        existingPopup.remove()
    }

    gallery.parentNode.appendChild(popupElement)

    document.querySelector('.bubble-popup').dataset.open = "1"
}

export function closeBubblePopup() {
    document.querySelector('.bubble-popup').dataset.open = "0"
}
