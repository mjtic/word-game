// Elements
let currentStatus = document.querySelector("#status");
let times = document.querySelector("#time");
let question = document.querySelector("#questions");
let answer = document.querySelector("#answers");
let startButton = document.querySelector("#startBtn");
let wins = document.querySelector("#winScore");
let losses = document.querySelector("#loseScore");
let resetButton = document.querySelector("#resetBtn");
// hidden input for keyboard - phones and tablets
let hiddenInput = document.querySelector("#hiddenInput");

// word string
let chosenWord = "";
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
    q: "What position does Harry play on the Gryffindor Quidditch team? ",
    a: "seeker",
  },
  {
    q: "What kind of pet does Harry own?",
    a: "owl",
  },
  {
    q: "What is Professor Minerva McGonagall's animagus?",
    a: "cat",
  },
  {
    q: "Who is Harry Potter's godfather? ",
    a: "siriusblack",
  },
  {
    q: "In what country did the first Starbucks open outside of North America?",
    a: "japan",
  },
  {
    q: "In a website browser address bar, what does “www” stand for? ",
    a: "worldwideweb",
  },
  {
    q: "Originally, Amazon only sold what kind of product?",
    a: "books",
  },
  {
    q: "On The Mandalorian, what is Baby Yoda's real name?",
    a: "grogu",
  },
  {
    q: "Who was the first televised President of United Stats of America?(Only Last Name)",
    a: "roosevelt",
  },
  {
    q: "In the Catholic Church, the Bishop of Rome is a title more commonly known as what?",
    a: "pope",
  },
  {
    q: "Actor Tom Holland lip-synced what song on the show Lip Sync Battle?",
    a: "umbrella",
  },
];
//randomize data
let randomData = Math.floor(Math.random() * data.length);
let questions = data[randomData].q;
let answers = data[randomData].a;
// background sounds
let clockTicking = new Audio("assets/sounds/ClockTicking.mp3");
let right = new Audio("assets/sounds/FemaleCrowdCelebration.mp3");
let wrong = new Audio("assets/sounds/AlarmClock.mp3");
// init function to render scores on scoreboard on pageload
let init = () => {
  getWins();
  getLosses();
};
// startGame() to carry out the game
let startGame = () => {
  // declaring values
  isWin = false;
  timerCount = 20;
  // re-using elements to carry it out every time game starts
  randomData = Math.floor(Math.random() * data.length);
  questions = data[randomData].q;
  answers = data[randomData].a;
  // start-button disabled once game starts
  startButton.disabled = true;
  showKeyboard();
  // render question, blanks, timer as game starts
  currentStatus.textContent = "ENTER THE KEYS TO FILL IN THE BLANK";
  times.textContent = `TIME: ${timerCount} seconds`;
  question.textContent = questions;
  blankLetters = [];
  startTimer();
  renderBlanks();
};

// rendering winning and losing
let winGame = () => {
  currentStatus.textContent = "YOU WON !!!";
  winCounter++;
  setWin();
  startButton.disabled = false;
  hideKeyboard();
};
let loseGame = () => {
  currentStatus.textContent = "GAME OVER";
  loseCounter++;
  setLose();
  startButton.disabled = false;
  hideKeyboard();
};
// startTimer () for setInterval
let startTimer = () => {
  timer = setInterval(() => {
    if (timerCount >= 0) {
      right.pause();
      wrong.pause();
      timerCount--;
      times.textContent = `TIME: ${timerCount} seconds`;
      clockTicking.play();

      if ((isWin && timerCount) > 0) {
        clearInterval(timer);
        winGame();
        clockTicking.pause();
        right.play();
      }
      if (timerCount === 0) {
        clearInterval(timer);
        loseGame();
        clockTicking.pause();
        wrong.play();
      }
    }
  }, 1000);
};

// rendering blanks
let renderBlanks = () => {
  // rendering question on screen
  question.textContent = questions;
  // elements to store, convert to string of array and length
  chosenWord = answers;
  lettersInChosenWord = chosenWord.split("");
  numBlank = lettersInChosenWord.length;
  // separate in array and join the into string with space
  for (let i = 0; i < numBlank; i++) {
    blankLetters.push("_");
  }
  answer.textContent = blankLetters.join(" ");
};

// setItems of win and lose
let setWin = () => {
  wins.textContent = `WINS: ${winCounter}`;
  localStorage.setItem("winCounter", winCounter);
};

let setLose = () => {
  losses.textContent = `LOSSES: ${loseCounter}`;
  localStorage.setItem("loseCounter", loseCounter);
};
// getItems of win and lose
let getWins = () => {
  let storedWin = localStorage.getItem("winCounter");
  if (storedWin === null) {
    winCounter = 0;
  } else {
    winCounter = storedWin;
  }
  wins.textContent = `WINS: ${winCounter}`;
};

let getLosses = () => {
  let storedLose = localStorage.getItem("loseCounter");
  if (storedLose === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLose;
  }
  losses.textContent = `LOSSES: ${loseCounter}`;
};

// checkWin
// compare chosen letters and blank letters
let checkWin = () => {
  if (chosenWord === blankLetters.join("")) {
    isWin = true;
  }
};
// checkLetter
// 1. check if user typed letter existied within selected chosenWord
// 2. if true, insert user typed letter into blanks
const checkLetter = (letter) => {
  // boolean indicator to show letter is in the chosenWord
  let letterInWord = false;
  for (let i = 0; i < numBlank; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
      blankLetters[i] = letter;
    }
  }
  if (letterInWord) {
    updateLetters();
  }
};
// update to blank with matched letter
const updateLetters = () => {
  answer.textContent = blankLetters.join(" ");
};

document.addEventListener("keyup", (e) => {
  //safeGuard
  if (timerCount === 0) {
    return;
  }
  let key = e.key.toLowerCase();
  let alphaNumericCharacters = /^[a-z0-9]+$/;
  if (alphaNumericCharacters.test(key)) {
    checkLetter(key);
    checkWin();
  }
});
// reset the game score on scoreboard
const resetScore = () => {
  winCounter = 0;
  loseCounter = 0;
  setWin();
  setLose();
};
// start function allow to play
const start = () => {
  init();
  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetScore);
};

start();

// keyboard for mobile devices

// how keyboard (focous the hidden input)
let showKeyboard = () => {
  hiddenInput.style.top = "0"; //this will bring the input field in to the viewport
  hiddenInput.focus(); // Focus on the hidden input to show the keyboard
};

let hideKeyboard = () => {
  hiddenInput.style.top = "-9999px"; //move away the input;
  hiddenInput.blur(); // blur the hidden input to hide the keyboard;
};


// Input filtering functions (vanilla JavaScript) - did not work
/* document.querySelectorAll('.alphaOnly').forEach(function(element){
  element.addEventListener('input',function(event){
    this.value = this.value.replace(/[^a-z]/g, '');
  });
}); */