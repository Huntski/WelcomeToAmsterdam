import {createMovableGallery} from "./functions.js"

export default class BubbleInterface {
    rows = []

    constructor(containerId = 'gallery', bubbles = []) {
        try {
            this.gallery = document.getElementById(containerId)

            this.createBubbleElementsWithRowsAndColumns(bubbles)
            this.animateFadeInBubbles()

            createMovableGallery(this.gallery)
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

            if (!this.rows.length) {
                this.createRow([bubbles[key]])

                continue
            }

            for (let a = 0; a < this.rows.length; a++) {
                if (this.rows[a].bubblesAmount > bubblesLimitPerRow && this.rows[a + 1] === undefined) {
                    this.createRow()
                    rowToAddBubbleTo = this.rows[this.rows.length - 1]
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
        const element = document.createElement('div')
        element.classList.add('bubble')

        if (typeof bubble === 'object') {
            const shop_picture = './img/shops/' + bubble.pictures[0]

            element.innerHTML = `
                <div class="bubble-popup">
                    <img class="bubble-popup__picture" src="${shop_picture}" alt="Very cute cat.">

                    <div class="bubble-popup__actions">
                        <h2>${bubble.name}</h2>
                    
                        <button class="like-button">
                            <span>30</span>
                        
                            <svg class="icon" viewBox="0 0 175 159" fill="#F54949" xmlns="http://www.w3.org/2000/svg">
                                <path d="M157.91 87.7452L87.5504 158.19L87.5 158.14L87.4496 158.19L17.0899 87.7452C-32.8043 37.7908 37.5555 -32.654 87.4496 17.3005L87.5 17.2501L87.5504 17.3005C137.445 -32.654 207.804 37.7908 157.91 87.7452Z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="bubble-popup__types">
                        <span>Japanese</span>
                        <span>Korea</span>
                    </div>
                    
                    <div class="bubble-popup__info">
                        <p>Stadsplein 95, 1181 ZM Amstelveen</p>
                        <p><span>Telefoon:</span> 020 312 1237</p>
                    </div>
              
                    
                    <button class="bubble-popup__button">
                        <span>START</span>
                    </button>
                </div>   
            `

            element.style.backgroundImage = `url(${shop_picture})`
        }

        /**
         * Array of cat images.
         * TODO: Change the array to functional object.
         */
        if (typeof bubble === 'string') {
            const cat_picture = './img/cats/' + bubble

            element.innerHTML = `
                <div class="bubble-popup">
                    <img class="bubble-popup__picture" src="${cat_picture}" alt="Very cute cat.">
                    <button class="like-button">
                        <span>12</span>
                    
                        <svg class="icon" viewBox="0 0 175 159" fill="#F54949" xmlns="http://www.w3.org/2000/svg">
                            <path d="M157.91 87.7452L87.5504 158.19L87.5 158.14L87.4496 158.19L17.0899 87.7452C-32.8043 37.7908 37.5555 -32.654 87.4496 17.3005L87.5 17.2501L87.5504 17.3005C137.445 -32.654 207.804 37.7908 157.91 87.7452Z"/>
                        </svg>
                    </button>
               
                    <div class="bubble-popup__comments">
                        <div class="comment">
                            <img class="comment__avatar" src="./img/avatars/first-profilepic.jpeg" alt="Profile picture">
                         
                            <div>
                                <h3 class="comment__username">Hannibal</h3>
                                <p class="comment__message">OMG super cute!!</p>
                            </div>
                        </div>
                        
                        <div class="comment">
                            <img class="comment__avatar" src="./img/avatars/ikmetkat.jpeg" alt="Profile picture">
                         
                            <div>
                                <h3 class="comment__username">Wieb</h3>
                                <p class="comment__message">Where did you find this cutie?</p>
                            </div>
                        </div>
                    </div>
                    
                    <input type="text" placeholder="Comment" class="comment-input-field">
                </div>   
            `

            element.style.backgroundImage = `url(${cat_picture})`
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
