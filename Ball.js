const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

// Creating Ball class for Game
export default class Ball {

    // Constructor for Ball 
    constructor(ballElement) {
        this.ballElement = ballElement
        this.direction
        this.reset()
    }

    // Getting Ball's X Postion from the CSS
    get x() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'))
    }

    // Setting Ball's X Position
    set x(value) {
        this.ballElement.style.setProperty('--x', value)
    }

    // Getting Ball's Y Postion from the CSS    
    get y() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'))
    }

    // Setting Ball's Y Position
    set y(value) {
        this.ballElement.style.setProperty('--y', value)
    }

    // Rect function to get Ball's Rect with Bounding
    rect() {
        return this.ballElement.getBoundingClientRect()
    }

    // Reset Function to Reset Ball's Position
    reset() {
        // Setting Ball in the Middle of the Screen
        this.x = 50
        this.y = 50

        // Setting the default direction of the Ball to Move in 
        this.direction = { x: 0.2, y: 0.9 }

        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {

            // Generating Random directions for the Ball when the Game resets
            const heading = getRandomNumberBetween(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }

        }
        this.velocity = INITIAL_VELOCITY
    }


    update(deltaTime, paddleRects) {
        // Updating Ball's Position to move with respect to the Direction 
        this.x += this.direction.x * this.velocity * deltaTime
        this.y += this.direction.y * this.velocity * deltaTime

        // Speeding up the Ball Velocity
        this.velocity += VELOCITY_INCREASE * deltaTime

        // Making sure that Ball does not goes out of the Window Screen
        const rect = this.rect()
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }
        if (paddleRects.some(x => isCollided(x, rect))) {
            this.direction.x *= -1
        }
    }
}

function getRandomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}

function isCollided(rect1, rect2) {
    return rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top
}