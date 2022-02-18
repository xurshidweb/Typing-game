// Globals 
const input = document.getElementById('input-text')
const word = document.querySelector('.word')
const scoreGame = document.getElementById('score')
const timeDisplay = document.getElementById('time')
const overlayEl = document.querySelector('.overlay')
const showblock = document.querySelector('.showblock')
const playBtn = document.querySelector('.play')
const endscore = document.getElementById('endscore')
const difficulty = document.getElementById('difficulty')


function getResult() {
    fetch('https://random-words-api.vercel.app/word').then(function (data) {
        return data.json()
    }).then(showResult)
}
getResult()

// word random
let wordRandom

// time
let time = 10;

//score word
let score = 0

function showResult(data) {
    wordRandom = data[0].word.toLowerCase()
    word.textContent = wordRandom
}



//input addevent
input.addEventListener('input', (e)=> {
    if(e.target.value == wordRandom) {
        getResult()
        score++
        scoreGame.textContent = score
        e.target.value = ''
        time = 10
    }
   
})

// game difucillty
difficulty.addEventListener('click', function() {
    if(difficulty.value == 'easy') {
        time+=5;
    }
    if(difficulty.value == 'medium') {
        time+=3;
    }
    if(difficulty.value == 'hard') {
        time+=2;
    }
})







let interval = setInterval(countTime,1000)
let intervalOk = true

// time function
function countTime() {
    if(time > 0) {
        time--
    }
    else if(time == 0) {
        showblock.classList.remove('hidden')
        overlayEl.classList.remove('hidden')
        clearInterval(interval)
        intervalOk = false
        
    }
    timeDisplay.textContent = time
    endscore.textContent = scoreGame.textContent

}


// play again 
playBtn.addEventListener('click', function (e) {
    showblock.classList.add('hidden')
    overlayEl.classList.add('hidden')
    getResult()
    score = 0;
    scoreGame.textContent = 0
    time = 10
    interval = setInterval(countTime,1000)
    input.value = ''
})