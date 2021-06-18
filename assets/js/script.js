// define variables
const cards = document.querySelectorAll('.memory-card');


let flippedCard = false; //used to check if card has already been clicked 
let lockBoard = false; // used to lock the board until each set of cards are finished are finished before selecting the next two
let firstCard, secondCard; //Used to check for cards match
let firstClick = 0;
let time = 0;

cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();

/*
onclick function for cards, add flip class for css effects
code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ and adapted
*/
function flipCard() {
  firstClick += 1;
  if(timer.seconds == 0 && timer.minutes == 0){
    timer();
  } // starts timer on firstClick

if(lockBoard) return; // return is lockBoard is true so the rest of the function wont be executed
if (this === firstCard) return;
this.classList.add('flip'); //if valid, flips card using css class
let len = moves.length;
if (len === 2){
  moveCounter++;
  moveCounter();
}
if (!flippedCard){
    // The first card clicked
    flippedCard = true;
    firstCard = this; //stores this as first card
    timer();
    return;
    
}

//The second card clicked
flippedCard = false;
secondCard = this; 

moveCounter();
checkCardMatch();
}

/*
ternary operator checking if firstCard & secondCard 'data-id' are a match
initial code taken form https://marina-ferreira.github.io/tutorials/js/memory-game/ and adapted
*/
function checkCardMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  isMatch ? pairMatch() : noMatch();
 }
       
  

function pairMatch(){
// if its a match the eventlistener is disabled
firstCard.removeEventListener('click', flipCard);  
secondCard.removeEventListener('click', flipCard); 

showWinMessage();
resetBoard();  
}

function noMatch(){
    lockBoard = true; // if no match, board is locked until cards are flipped back
 // then if its not a match the flipclass is removed
 setTimeout(() => {
    firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  
  resetBoard();
  }, 900);  
  
}



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


// move counter & game timer 
let moves = 0;
function moveCounter() {
  moves++;
 
}

//game timer -https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
let sec = 0;
function timer(val) {
  return  val > 9 ? val : "0" + val;
}
setInterval(function(){
  document.getElementById("seconds").innerHTML=timer(++sec%60);
  document.getElementById("minutes").innerHTML=timer(parseInt(sec/60,10));
}, 1000);
  

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
  timer(); // timer reset will go here
}

const winMsg = document.getElementById('win-msg');
const modal = document.getElementById('modal');
const close = document.getElementById('close');

//add an event for when all pairs match and game is won 
//if (pairMatch.length === 16){
 // showWinMessage();
//}

close.addEventListener('click', () => {
  modal.classList.remove('show');
});

function showWinMessage(){
  
}

