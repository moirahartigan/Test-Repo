// scripts.js
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
this.classList.add('flip');

if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
   } else {
       hasFlippedCard = false;
       secondCard = this;

    //  do they match? - if not thay will be flipped back
    if (firstCard.dataset.image ===
        secondCard.dataset.image) {
            // if its a match the eventlistener is disabled
        firstCard.removeEventListener('click', flipCard);  
        secondCard.removeEventListener('click', flipCard);  
        } else {
            // then if its not a match the flipclass is removed
         setTimeout(() => {
           firstCard.classList.remove('flip');
         secondCard.classList.remove('flip');  
         }, 900); 
         
        }        
   }
}


cards.forEach(card => card.addEventListener('click', flipCard));
