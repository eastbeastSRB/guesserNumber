/*
  Game functions:
  - Player must guess a number between a min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Norify the player of the correct answer if loose
  - Let player choose to play again

*/

// Game Values
let min = 1,
    max = 10,
    winingNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');


// Assing UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// Play Again Even Listener
game.addEventListener('mousedown', function(e){

  if(e.target.className === 'play-again'){
    window.location.reload();
  }

});

// Listen for guess
guessBtn.addEventListener('click', function(){

  let guess = parseInt(guessInput.value);

  console.log(guess);

  // Validate
  if(isNaN (guess) || guess < min || guess > max){
    setMessage(`Please insert a number between ${min} and ${max} `, 'red');
    
  } // Check if won
  else if(guess === winingNum){

    // Game WON
    gameOver(true, `${guess} is correct, YOU WIN !`);

  }
  else{

    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game LOST
      gameOver(false,`Game is over, you lost.. the correct number is ${winingNum}`);
      } else {

      // Game continues - answer wrong
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left `, 'red');
      guessInput.style.borderColor = 'red';

      // Clear input
      guessInput.value = "";
        
      }
  }

});

function gameOver(won, msg){

  let color;
  won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    message.style.color = color;
    // Set msg
    setMessage(msg);

    // Play Again ?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';



}

function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min); // Random number from 1 to 10
}


function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
