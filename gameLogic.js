// Importing Ball 
import Ball from './Ball.js'
import Paddle from './Paddle.js'

// Importing all the Game Elements
const ball = new Ball(document.getElementById('game-ball'))
const playerPaddle = new Paddle(document.getElementById('game-player-paddle'))
const computerPaddle = new Paddle(document.getElementById('game-computer-paddle'))

// Importing Scores
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')

// Importing Modal to Show Play again or Go Home options
const modal = document.getElementById('modal')
const playAgainButton = document.getElementById('play-again-btn')

// Importing Winner Element to show the Game Winner
const winner = document.getElementById('winner-text')

let lastTime;
let pause = false

let allUsers = JSON.parse(window.localStorage.getItem('users'))

// Game Update Loop
function gameUpdateLoop(time) {

    if (lastTime != null) {

        // Creating Delta Time for Smooth Game FPS
        const deltaTime = time - lastTime

        // Updating Ball if the Game is not Paused
        if (!pause) {
            ball.update(deltaTime, [playerPaddle.rect(), computerPaddle.rect()])
        }

        // Updating Computer Paddle
        computerPaddle.update(deltaTime, ball.y)

        if (isLose()) {
            handleLose()
        }

    }

    // Updating Last Time
    lastTime = time

    // Calling Updating Game Loop Function with every Frame on HTML page
    window.requestAnimationFrame(gameUpdateLoop)
}

function handleLose() {

    const rect = ball.rect()

    if (rect.right >= window.innerWidth) {
        // Cheking if player Score is equal to 3 and decalring Player as winner
        if (parseInt(playerScore.textContent) == 3) {
            
            // Setting Currnet User Score
            let currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'))
            currentUser.score = parseInt(parseInt(playerScore.textContent) * lastTime)

            allUsers.filter((user) => {
                if (user.username === currentUser.username) {
                    user.score = currentUser.score
                }
            })

            window.localStorage.setItem('users', JSON.stringify(allUsers))

            pause = true
            modal.classList.remove('hidden')
            winner.textContent = `Congrats, You Win..!`
            ball.reset()
            computerPaddle.reset()
            playerScore.textContent = 0
        }
        // Increasing Player score
        else {
            playerScore.textContent = parseInt(playerScore.textContent) + 1
        }
    }
    else {
        // Cheking if Computer Score is equal to 3 and decalring Computer as winner
        if (parseInt(computerScore.textContent) == 3) {

            // Setting Currnet User Score
            let currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'))
            currentUser.score = parseInt(parseInt(playerScore.textContent) * lastTime)

            allUsers.filter((user) => {
                if (user.username === currentUser.username) {
                    user.score = currentUser.score
                }
            })

            window.localStorage.setItem('users', JSON.stringify(allUsers))

            pause = true
            modal.classList.remove('hidden')
            winner.textContent = `Boo, You Lose..!`
            ball.reset()
            computerPaddle.reset()
            computerScore.textContent = 0
        }
        // Computer Player score
        else {
            computerScore.textContent = parseInt(computerScore.textContent) + 1
        }
    }
    ball.reset()
    computerPaddle.reset()
}
// Function to chekc if anyone of Player or Computer loses the Game
function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

document.addEventListener('mousemove', event => {
    playerPaddle.position = (event.y / window.innerHeight) * 100
})

document.addEventListener('touchstart', event => {
    [...event.changedTouches].forEach(touch => {
        playerPaddle.position = (touch.pageY / window.innerHeight) * 100
    })
})

document.addEventListener('touchmove', event => {
    [...event.changedTouches].forEach(touch => {
        playerPaddle.position = (touch.pageY / window.innerHeight) * 100
    })
})

// Starting Updating Game Loop 
window.requestAnimationFrame(gameUpdateLoop)

// Function to chekc if Player wants to Play Game again
playAgainButton.onclick = function () {
    pause = false
    modal.classList.add('hidden')
    winner.textContent = ''
    ball.reset()
    computerPaddle.reset()
    computerScore.textContent = 0
    playerScore.textContent = 0
}