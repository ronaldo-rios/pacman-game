class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed,
        this.direction = RIGHT_DIRECTION
    }

    moveProcess() {
        this.changeDirectionIfPossible()
        this.moveForwards()
        if(this.checkCollision()) {
            this.moveBackwards
        }
    }

    eat() {

    }

    moveBackwards() {
        switch (this.direction) {
            case RIGHT_DIRECTION: 
                this.x -= this.speed
                break
            case UP_DIRECTION:
                this.y += this.speed
                break
            case LEFT_DIRECTION:
                this.x += this.speed
                break
            case BOTTOM_DIRECTION: 
                this.y -= this.speed
                break
        }
    }

    moveForwards() {
        switch (this.direction) {
            case RIGHT_DIRECTION: 
                this.x += this.speed
                break
            case UP_DIRECTION: 
                this.y -= this.speed
                break
            case LEFT_DIRECTION: 
                this.x -= this.speed
                break
            case BOTTOM_DIRECTION: 
                this.y += this.speed
                break
        }
    }

    checkCollision() {

    }

    checkGhostCollision() {

    }

    changeDirectionIfPossible() {

    }

    changeAnimation() {

    }

    draw() {

    }
}