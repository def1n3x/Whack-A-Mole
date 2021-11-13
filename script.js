const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const highScoreBoard = document.querySelector('.highScore');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;
let highScore = localStorage.getItem('game1HighScore') || 0;
highScoreBoard.textContent = 'HIGH SCORE: ' + highScore;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function popOut(){
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){ // !!!!!!!!!
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time);
}


function startGame(){
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            clearInterval(startCountdown);
            checkHihgScore();
            countdownBoard.textContent = 'Time is over! It was difficult, but you did it!';
        }
    }, 1000);
}
startButton.addEventListener('click', startGame);

function whack(e){
    score++;
    this.style.backgroundImage = 'url("/images/zombie2.png")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("/images/zombie1.png")';
        this.style.pointerEvents = 'all';

    }, 800);
    scoreBoard.textContent = score;

}
moles.forEach(mole => mole.addEventListener('click', whack));

function checkHihgScore() {
    if (score > localStorage.getItem('game1HighScore')) {
        localStorage.getItem('game1HighScore', score);
        highScore = score;
        highScoreBoard.textContent = 'HIGH SCORE: ' + highScore;
    }
}

var audio = document.querySelector("audio");
audio.volume = 0.1;