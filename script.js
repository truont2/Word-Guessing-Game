// declare timer globally so u can use the value aywhere
var timer;
var timerCount;
var winStatus = false;
var winCounter = 0; 
var lossCounter = 0;
var numBlanks = 0;
var chosenWord = "";

var lettersInChosenWord = [];
var blankLetters = [];

var words = ["keyboard", "computer", "mousepad", "mouse", "monitor", "headphones"];

var timerElement = document.querySelector(".timer-count");
var startBtn = document.querySelector(".start-button");
var wordBlanks = document.querySelector(".word-blanks");
var win = document.querySelector(".wins");
var losses = document.querySelector(".losses");
var resetBtn = document.querySelector(".reset-button");

function init() {
    getLosses();
    getWins();
}

startBtn.addEventListener('click', startGame);

// start game when start button is pressed 
function startGame() {
    winStatus = false;
    timerCount = 10;

    // prevents start button from being pressed again 
    startBtn.disabled = true;
    setTimer();
    renderBlanks();
}

// set up timer 
function setTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;

        if(timerCount >=0) {
            if(winStatus && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }

        if(timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blankLetters = [];

    for (let i = 0; i < numBlanks; i ++) {
        blankLetters.push("_");
    }

    // converts array into a string and puts a space between each element
    wordBlanks.textContent = blankLetters.join(" ");
}

function getWins() {
    // if stored in local storage get the wins and set equal to the winCOunter

    var storedWins = localStorage.getItem("winCount");

    if (storedWins === null) {
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }

    win.textContent = winCounter;
}

function getLosses() {
    // if stored in the local storage, set lossCounter to the value
    var storedLosses = localStorage.getItem("lossCount");

    // if stored value exists then counter is updated 
    if (storedLosses === null) {
        lossCounter = 0;
    } else {
        lossCounter = storedLosses;
    }

    losses.textContent = lossCounter;
}

function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
}

function setLosses() {
    losses.textContent = lossCounter;
    localStorage.setItem("lossCount", lossCounter);
}

function winGame() {
    wordBlanks.textContent = "YOU WON!";
    winCounter++;
    startBtn.disabled = false;
    setWins();
}

function loseGame() {
    wordBlanks.textContent = "YOU LOST! :(";
    lossCounter++
    startBtn.disabled = false;
    setLosses();
}

function checkLetters(letter) {
    var letterInWord = false;
    for(let i = 0; i < numBlanks; i++) {
        if(chosenWord[i] === letter) {
            letterInWord = true;
        }
    }
    
    if(letterInWord) {
        for( let i = 0; i < numBlanks; i++) {
            if (chosenWord[i] === letter) {
                blankLetters[i] = letter;
            }
        }

        wordBlanks.textContent = blankLetters.join(" ");
    }
}

function checkWin() {
    if(chosenWord === blankLetters.join("")) {
        winStatus = true;
    }
}

// get the key
document.addEventListener('keydown', function(event) {
    event.preventDefault;
    console.log(event.key);
    if (timer===0) {
        return; 
    }

    var key = event.key.toLowerCase();
    var alphabet = "abcdefghijklmnopqrstuvwxyz";

    if(alphabet.includes(key)) {
        var letterGuessed = event.key;
        checkLetters(letterGuessed);
        checkWin();
    }
})


// run to get stored win counter
init();


function resetGame() {
    winCounter = 0;
    lossCounter = 0;
    setWins();
    setLosses();
}
resetBtn.addEventListener("click", resetGame);