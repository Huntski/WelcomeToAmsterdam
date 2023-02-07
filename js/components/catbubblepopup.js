import {closeBubblePopup} from "../modules/composables/bubblepopup.js";

export function CatBubblePopup(data) {
    const nodeElement = document.createElement('div')
    nodeElement.classList.add('bubble-popup')

    const picture = './img/cats/' + data

    nodeElement.innerHTML = `
    <div class="bubble-popup__top-section">
        <img src="${picture}" alt="Image of cat being cute.">
    
        <button class="button-close">
            <svg viewBox="0 0 63 63" fill="none" stroke="white"> 
                <path d="M10 10.1899L53 53.1899" stroke-width="19" stroke-linecap="round"/>
                <path d="M53 10.1899L10 53.1899" stroke-width="19" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="bubble-popup__actions">
            <button class="like-button">
                <span>12</span>
            
                <svg class="icon" viewBox="0 0 175 159" fill="#F54949" xmlns="http://www.w3.org/2000/svg">
                    <path d="M157.91 87.7452L87.5504 158.19L87.5 158.14L87.4496 158.19L17.0899 87.7452C-32.8043 37.7908 37.5555 -32.654 87.4496 17.3005L87.5 17.2501L87.5504 17.3005C137.445 -32.654 207.804 37.7908 157.91 87.7452Z"/>
                </svg>
            </button>
        </div>
    </div>
    
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
    `

    nodeElement.querySelector('.button-close').onclick = closeBubblePopup

    return nodeElement
}
