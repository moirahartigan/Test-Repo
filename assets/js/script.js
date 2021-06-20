// define variables
const cards = document.querySelectorAll('.memory-card');

//on first flipped card if match with second flipped card it will lock both cards
let flippedCard = false; //used to check if card has already been clicked 
let lockBoard = false; // used to lock the board until each set of cards are finished are finished before selecting the next two
let firstCard, secondCard; //Used to check for cards match
let moves = 0;
let matchCounter = 0;


cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();

/*
onclick function for cards, add flip class for css effects
code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ and adapted
*/
function flipCard() {
if(lockBoard) return; // return is lockBoard is true so the rest of the function wont be executed
if (this === firstCard) return;

this.classList.add('flip'); //if valid, flips card using css class

if (!flippedCard){
    // The first card clicked
    flippedCard = true;
    firstCard = this; //stores this as first card
  
    return;    
}

//The second card clicked
secondCard = this; 

checkCardMatch();
}

/*
ternary operator checking if firstCard & secondCard 'data-id' are a match and if so prevents them flipping back
initial code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ and adapted
*/
function checkCardMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if(isMatch){
    matchCounter += 1;
    pairMatch();
    if(matchCounter == (cards.length/2)){
      
    }
  } else {
    noMatch();
 }
}     
  
// matched cards will be disabled for clicks once they are flipped
function pairMatch(){
// if its a match the eventlistener is disabled

firstCard.removeEventListener('click', flipCard);  
secondCard.removeEventListener('click', flipCard); 


resetBoard();  
}

// if no match, board is locked until cards are flipped back
function noMatch(){
  lockBoard = true; 
 
 setTimeout(() => {
    firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  
  resetBoard();
  }, 900);  

  // Add move
addMove();

}

// move counter & game timer 
const moveContainer = document.querySelector(".moves");
moves = 0;
moveContainer.innerHtml = 0;
function addMove() {
  moves++;
  moveContainer.innerHTML = moves;
 console.log('addmove');
}

//reset move counter
function resetCounter(){
  moves[0].innerHTML = moves = 0;
}

//game timer -https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
const timerContainer = document.querySelector(".timer");
let liveTimer,
totalSeconds = 0;

timerContainer.innerHTML = totalSeconds + "s";


function startTimer() {
  liveTimer = setInterval(function() {
    totalSeconds++;
    timerContainer.innerHTML = totalSeconds + "s";
  }, 1000);
}



function stopTimer() {
  clearInterval(liveTimer);

}
  
// new game button 
function reset(){
  setTimeout(() => {
    flippedCard = false;
    [firstCard, secondCard] = [null, null];
    timer = 0;
    moves = 0;
    cards.forEach(cardReset => cardReset.classList.remove('flip'));
    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
  }, 500);
  startTimer(); // timer reset will go here
}


const modal = document.getElementById('modal');
const close = document.getElementById('close');

function winGame() {
  if (pairMatch.length === 2) {
    // stopTimer();
    // showWinMessage();
    console.log("i won the game");
  }
}

function showWinMessage(){
    modal.style.display ="block";
}
// when the user clicks on the close modal
window.onclick = function (event) {
  if (event.target.id == 'close') {
    document.getElementById('modal').style.display = "none";
  }
};


 
function resetBoard(){
  [flippedCard, lockBoard] = [false, false];
  [firstCard,secondCard] = [null, null];
}


// Card shuffle
function shuffle() {
  cards.forEach(cards => {
      let randomPosition = Math.floor(Math.random() * 16);
      cards.style.order = randomPosition;
  })

};




