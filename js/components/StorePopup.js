export function StorePopup(picture, name) {
    return `
        <div class="bubble-popup">
            <img class="bubble-popup__picture" src="${picture}" alt="Very cute cat.">
            
            <button class="button-close">
                <svg viewBox="0 0 63 63" fill="none" stroke="white">
                    <path d="M10 10.1899L53 53.1899" stroke-width="19" stroke-linecap="round"/>
                    <path d="M53 10.1899L10 53.1899" stroke-width="19" stroke-linecap="round"/>
                </svg>
            </button>

            <div class="bubble-popup__actions">
                <h2>${name}</h2>
            
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
}
