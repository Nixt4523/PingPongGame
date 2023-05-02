// Observer Function to create Fade in Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('showElement')
        } else {
            entry.target.classList.remove('showElement')
        }
    })
})

// Selecting all the Elements with hideElements
const hiddenElements = document.querySelectorAll('.hiddenElement')
hiddenElements.forEach((element) => observer.observe(element))

// Demo-game Animations

// Selecting Paddles for Animation
const pladdleInfo = document.getElementById('paddle-info')
const playerPaddle = document.getElementById('player-paddle')
const computerPaddle = document.getElementById('computer-paddle')

// Paddle Animations
pladdleInfo.onmouseover = function(){
    playerPaddle.classList.add('bg-black')
    computerPaddle.classList.add('bg-black')
}
pladdleInfo.onmouseleave = function(){
    playerPaddle.classList.remove('bg-black')
    computerPaddle.classList.remove('bg-black')
}

// Selecting Ball for Animation
const ballInfo = document.getElementById('ball-info')
const ball = document.getElementById('ball')

// Ball Animations
ballInfo.onmouseover = function(){
    ball.classList.add('bg-black')
}
ballInfo.onmouseleave = function(){
    ball.classList.remove('bg-black')
}

// Selecting Score for Animation
const roundInfo = document.getElementById('round-info')
const score = document.getElementById('score')

// Score Animations
roundInfo.onmouseover = function(){
    score.classList.add('scale-110', 'font-bold')
}

roundInfo.onmouseleave = function(){
    score.classList.remove('scale-110', 'font-bold')
}
