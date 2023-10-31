/* win and lose count should be localStoraged
button start, timer start and reset
word-bank = [];
blanks _ _ _ _
keypress , keyEvent
word === blank => replace with letter
gameEnds === timerEnds => message appear and timer stop
total winds and looses on the screen at the end */

// Elements
let currentStatus = document.querySelector("#status");
let times = document.querySelector("#time");
let question = document.querySelector("#questions");
let answer = document.querySelector("#answers");
let startButton = document.querySelector("#startBtn");
let wins = document.querySelector("#winScore");
let losses = document.querySelector("#loseScore");
let resetButton = document.querySelector("#resetBtn");

// word string
let chosenWord = '';
// time variables 
let timer; //setInterval
let timerCount; //time storage
// win and lose counters
let winCounter = 0;
let loseCounter = 0;
// number of blanks;
let numBlank = 0;
// game won indicator
let isWin = false;

// arrays
let blankLetters = [];
let lettersInChosenWord = [];

let data = [
  {
    'q':'What position does Harry play on the Gryffindor Quidditch team? ',
    'a':'seeker',
  },
  {
    'q':'What kind of pet does Harry own?',
    'a':'owl',
  },
  {
    'q':'What is Professor Minerva McGonagall\'s animagus?',
    'a':'cat',
  },
  {
    'q':'Who is Harry Potter\'s godfather? ',
    'a':'siriusblack',
  },
];

let randomData = Math.floor(Math.random()*data.length);
let questions = data[randomData].q;
let answers = data[randomData].a;

// init() to render scoreboard as page loads
let init = (()=>{
  getWins();
  getLosses();
});

// startGame() to carry out the game
let startGame = (()=>{
  // declaring values
  isWin = false;
  timerCount = 10;
  // re-using elements to carry it out every time game starts
  randomData = Math.floor(Math.random()*data.length);
  questions = data[randomData].q;
  answers = data[randomData].a;

  // start-button disabled once game starts
  startButton.disabled = true;
  // render question, blanks, timer as game starts
  currentStatus.textContent = 'ENTER THE KEYS TO FILL IN THE BLANK'
  question.textContent = questions;
  blankLetters = [];
  startTimer();
  renderBlanks();
});

// rendering winning and losing
let winGame = (()=>{
  currentStatus.textContent = 'YOU WON !!!';
  winCounter++;
  setWin();
  startButton.disabled = false;
});

let loseGame = (()=>{
  currentStatus.textContent = 'GAME OVER';
  loseCounter ++;
  setLose();
  startButton.disabled = false;
});

let startTimer = (()=>{
  timer = setInterval(()=>{
    if(timerCount>=0){
        timerCount --;
        times.textContent = `TIME: ${timerCount} seconds`
      if((isWin&&timerCount) > 0){
        clearInterval(timer);
        winGame();
      };
      if(timerCount === 0){
        clearInterval(timer);
        loseGame();
      }
    }
  },1000);
});


let renderBlanks = (()=>{
  // rendering question on screen
  question.textContent = questions;
  // elements to store, convert to string of array and length
  chosenWord = answers;
  lettersInChosenWord = chosenWord.split('');
  numBlank = lettersInChosenWord.length;
  // separate in array and join the into string with space
  for(let i=0; i<numBlank; i++){
    blankLetters.push('_');
  }
  answer.textContent = blankLetters.join(' ');
});

// setItems of win and lose
let setWin = (()=>{
  wins.textContent = `WINS: ${winCounter}`;
  localStorage.setItem('winCounter',winCounter);
});

let setLose = (()=>{
  losses.textContent = `LOSSES: ${loseCounter}`;
  localStorage.setItem('loseCounter',loseCounter);
});
// getItems of win and lose
let getWins = (()=>{
  let storedWin = localStorage.getItem('winCounter');
  if(storedWin === null){
    winCounter = 0;
  }else{
    winCounter = storedWin;
  }
  wins.textContent = `WINS: ${winCounter}`;
});

let getLosses = (()=>{
  let storedLose = localStorage.getItem('loseCounter');
  if(storedLose===null){
    loseCounter = 0;
  }else{
    loseCounter = storedLose;
  }
  losses.textContent = `LOSSES: ${loseCounter}`;
});

// checkWin
// compare chosen letters and blank letters
let checkWin = (()=>{
  if(chosenWord === blankLetters.join('')){
    isWin = true;
  }
});

// checkLetter
let checkLetter = ((letter)=>{
  // elements to store, convert to string of array and length
  chosenWord = answers;
  lettersInChosenWord = chosenWord.split('');
  numBlank = lettersInChosenWord.length;
  // boolean indicator to show letter is in the chosenWord
  let letterInWord = false;
  for(let i=0; i<numBlank; i++){
    if(chosenWord[i]===letter){
      letterInWord = true;
    }
  }
  if(letterInWord){
    for(let j=0; j<numBlank; j++){
      if(chosenWord[j]===letter){
        blankLetters[j] = letter;
      }
    }
    answer.textContent = blankLetters.join(' ');
  }
});

document.addEventListener('keydown',((e)=>{
  //safeGuard
  if(timerCount===0){
    return;
  }
  let key = e.key.toLowerCase();
  let alphaNumericCharacters = /^[a-z0-9]+$/;
  if(alphaNumericCharacters.test(key)){
    checkLetter(key);
    checkWin();
  }
}));

init();

startButton.addEventListener('click',startGame);

let resetGame = (()=>{
  winCounter = 0;
  loseCounter = 0;
  setWin();
  setLose();
});

resetButton.addEventListener('click',resetGame);














/* //status
// timer
let timer;
let timerCount;
// data comparison
let chosenWord = '';
let numBlank = 0;
// record
let winCounter = 0;
let loseCounter = 0;
let isWin = false;

// create to show letters and blanks
let lettersInChosenWord = [];
let blankLetters = [];

// Word bank and game state
let data = [
  {
    q: "What is the main character's name from Harry Potter?",
    a: "harrypotter",
  },
  {
    q: "What is the name of Harry\'s best friend, who is known of his red hair?",
    a: "ronweasley",
  },
];
let randomData = Math.floor(Math.random()*data.length);
let questions = data[randomData].q;
let answers = data[randomData].a;

// init to display scoreboard when page loads
let init = (()=>{
  getWins();
  getLosses();
});
// after startButton is clicked startGame() is called
let startGame = (()=>{
  isWin = false;
  timerCount = 20;
  // prevent button to clicked again during game is playing
  startButton.disabled = true;
  // functions to be run during the game
   currentStatus.textContent = 'ENTER THE KEYS TO FILL IN THE BLANK';

  randomData = Math.floor(Math.random() * data.length);
  questions = data[randomData].q;
  answers = data[randomData].a;

  startTimer();
  renderBlanks();
});
// after winning the game
let winGame=(()=>{
  currentStatus.textContent = 'YOU WON!!!🏆';
  winCounter++;
  setWins();
  // restore the button ability to be clicked
  startButton.disabled = false;
});
// after lossing the game
let loseGame = (()=>{
  currentStatus.textContent = 'GAME OVER';
  loseCounter++;
  setLosses();
  startButton.disabled = false;
});

// function startTimer
let startTimer = (()=>{
  // setInterval
  let timer = setInterval(()=>{
    timerCount--;
    times.textContent = `${timerCount} seconds`;
    // scenerios
    if(timerCount>=0){
      // test if user won
      if((isWin && timerCount) > 0){
        clearInterval(timer);
        winGame();
      }
      // if time ran out
      if(timerCount===0){
        clearInterval(timer);
        loseGame();
      }
    }
  },1000);
});

let renderBlanks = (()=>{
  chosenWord = answers;
  lettersInChosenWord = chosenWord.split('');
  numBlank = lettersInChosenWord.length;
  blankLetters = [];
  for(let i=0; i<numBlank; i++){
    blankLetters.push('_');
  }
  question.textContent = questions;
  answer.textContent = blankLetters.join(' ');
});
// win and lose count localStoraged
let setWins=(()=>{
  wins.textContent = `WINS: ${winCounter}`;
  localStorage.setItem('winCounter',winCounter);
});

let setLosses=(()=>{
  losses.textContent = `LOSSES: ${loseCounter}`;
  localStorage.setItem('loseCounter',loseCounter);
});

// getWins and getLose to render on scoreboard once init() runs
let getWins = (()=>{
  // stored variable to store value
  let storedWin = localStorage.getItem('winCounter');
  if(storedWin === null){
    winCounter = 0;
  }else{
    winCounter = storedWin;
  }
  // render stored wins value;
    wins.textContent = `WINS: ${winCounter}`;
});
let getLosses = (()=>{
  let storedLose = localStorage.getItem('loseCounter');
  if(storedLose === null){
    loseCounter = 0;
  }else{
    loseCounter = storedLose;
  }
  losses.textContent = `LOSSES: ${loseCounter}`;
});

// compare answer and blanks
// If the word equals the blankLetters array when converted to string, set isWin to true
let checkWin = (()=>{
  if(chosenWord === blankLetters.join('')){
  // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
});
// Tests if guessed letter is in word and renders it to the screen.
let checkLetters = ((letter)=>{
  let letterInWord = false;
  for(let i=0; i<numBlank; i++){
    if(chosenWord[i]===letter){
      letterInWord = true;
    }
  }
  if(letterInWord){
    for(let j=0; j<numBlank; j++){
      if(chosenWord[j]===letter){
        blankLetters[j] = letter;
      }
    }
    answer.textContent = blankLetters.join(' ');
  }
});

// attaching event keydown to document

document.addEventListener('keydown',((e)=>{
  // if timerCount is '0' exit function
  if(timerCount===0){
    return;
  }
  // conver all typed keys to lowercase
  let key = e.key.toLowerCase();
  let alphaNumericCharacters = /^[a-z0-9 ]+$/;
  // check key vs alphaNumericCharagers
  if(alphaNumericCharacters.test(key)){
    // user guess
    let letterGuessed = e.key;
    checkLetters(letterGuessed);
    checkWin();
  }
}));

startButton.addEventListener('click',startGame);

init();

let resetScore = (()=>{
  // reset counts to 0
  winCounter = 0;
  loseCounter = 0;
  // save this to localStorage
  setWins();
  setLosses();
});

resetButton.addEventListener('click',resetScore);






 */
