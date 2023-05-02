// Paddle Speed
const SPEED = 0.015

export default class Paddle{
    constructor(paddleElement){
        this.paddleElement = paddleElement
        this.reset()
    }

    // Getting Paddle Positions
    get position(){
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue('--position'))
    }   

    // Setting Paddle Positions
    set position(value){
        this.paddleElement.style.setProperty('--position', value)
    }

    // Getting Paddle Rect
    rect(){
        return this.paddleElement.getBoundingClientRect()
    }

    // Resetting Paddle Position
    reset(){
        this.position = 50
    }

    // Updating Paddle Position
    update(deltaTime, yPos){
        this.position += SPEED * deltaTime * (yPos - this.position)
    }
}
