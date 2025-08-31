const canvas = document.querySelector('#canvas')
const canvasContext = canvas.getContext('2d')
const pacmanFrames = document.querySelector('#animations')
const ghostFrames = document.querySelector('#ghosts')

const RIGHT_DIRECTION = 4
const UP_DIRECTION = 3
const LEFT_DIRECTION = 2
const BOTTOM_DIRECTION = 1

let lives = 3
let ghosts = []
let ghostCount = 4
let score = 0
let fps = 30
let oneBlockSize = 20
let wallSpaceWidth = oneBlockSize / 1.4
let wallOffSet = (oneBlockSize - wallSpaceWidth) / 2
let wallColor = '#342DCA'
let wallInnerColor = '#000'
let foodColor = '#FEB897'
let foodCount = 0

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

// if 1 then wall, if 0 then not wall
let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

let ghostLocations = [
    {x: 0, y: 0},
    {x: 176, y: 0},
    {x: 0, y: 121},
    {x: 176, y: 121},
]

let randomTargetsForGhosts = [
    {x: 1 * oneBlockSize, y: 1 * oneBlockSize},
    {x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize},
    {x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize},
    {x: (map[0].length - 2) * oneBlockSize, y: (map[0].length - 2) * oneBlockSize},
]

let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5
    )
}

let createGhosts = () => {
    ghosts = []
    for(let i = 0; i < ghostCount; i++) {
        let newGhost = new Ghost(
            9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            pacman.speed / 2,
            ghostLocations[i % 4].x,
            ghostLocations[i % 4].y,
            124,
            116,
            6 + i
        )
        ghosts.push(newGhost)
    }
}

for(let i = 0; i < map.length; i++){
    for(let j = 0; j < map[0].length; j++){
        if(map[i][j] == 2) {
            foodCount++
        }
    }
}

let gameLoop = () => {
    draw()
    update()
}

let update = () => {
    pacman.moveProcess()
    pacman.eat()
    for(let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveProcess()
    }
    if(pacman.checkGhostCollision()) {
        restartGame()
    }
    if(score >= foodCount) {
        drawWin()
        clearInterval(gameInterval)
    }
}

let restartGame = () => {
    createNewPacman()
    createGhosts()
    lives--
    if(lives == 0) {
        gameOver()
    }
}

let gameOver = () => {
    drawGameOver()
    clearInterval(gameInterval)
}

let drawGameOver = () => {
    canvasContext.font = '40px Emulogic'
    canvasContext.fillStyle = '#FFF'
    canvasContext.fillText('Game Over!', 100, 200)
}

let drawWin = () => {
    canvasContext.font = '40px Emulogic'
    canvasContext.fillStyle = '#FFF'
    canvasContext.fillText('Winner!', 100, 200)
}

let drawLives = () => {
    canvasContext.font = '20px Emulogic'
    canvasContext.fillStyle = '#FFF'
    canvasContext.fillText(
        `Lives: ${lives}`, 
        220, 
        oneBlockSize * (map.length + 1) + 10
    )

    for(let i = 0; i < lives; i++){
        canvasContext.drawImage(
            pacmanFrames,
            2 * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            350 + i * oneBlockSize,
            oneBlockSize * map.length + 2,
            oneBlockSize,
            oneBlockSize
        )
    }
}

let drawFoods = () => {
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[0].length; j++){
            if(map[i][j] == 2) {
                createRect(
                    j * oneBlockSize + oneBlockSize / 3,
                    i * oneBlockSize + oneBlockSize / 3,
                    oneBlockSize / 3,
                    oneBlockSize / 3,
                    foodColor
                )
            }
        }
    }
}

let drawScore = () => {
    canvasContext.font = '20px Emulogic'
    canvasContext.fillStyle = '#FFF'
    canvasContext.fillText(
        `Score:  ${score}`, 
        0, 
        oneBlockSize * (map.length + 1) + 10
    )
}

let drawGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw()
    }
}

let draw = () => {
    createRect(0, 0, canvas.width, canvas.height, '#000')
    drawWalls()
    drawFoods()
    pacman.draw()
    drawScore()
    drawGhosts()
    drawLives()
}

let gameInterval = setInterval(gameLoop, 1000 / fps)

let drawWalls = () => {
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++) {
            if(map[i][j] == 1){
                createRect(
                    j * oneBlockSize, 
                    i * oneBlockSize, 
                    oneBlockSize, 
                    oneBlockSize,
                    wallColor
                )
                if (j > 0 && map[i][j - 1] == 1) {
                    createRect(
                        j * oneBlockSize, 
                        i * oneBlockSize + wallOffSet, 
                        wallSpaceWidth + wallOffSet,
                        wallSpaceWidth,
                        wallInnerColor
                    )
                }
                if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffSet, 
                        i * oneBlockSize + wallOffSet, 
                        wallSpaceWidth + wallOffSet,
                        wallSpaceWidth,
                        wallInnerColor
                    )
                }
                if (i < map.length - 1 && map[i + 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffSet,
                        i * oneBlockSize + wallOffSet,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffSet,
                        wallInnerColor
                    )
                }
                if (i > 0 && map[i - 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffSet,
                        i * oneBlockSize,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffSet,
                        wallInnerColor
                    )
                }
            }
        }
    }
}

createNewPacman()
createGhosts()
gameLoop()

window.addEventListener('keydown', (e) => {
    setTimeout(() => {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') { // left
            pacman.nextDirection = LEFT_DIRECTION
        } else if (e.code === 'ArrowUp' || e.code === 'KeyW') { // up
            pacman.nextDirection = UP_DIRECTION
        } else if (e.code === 'ArrowRight' || e.code === 'KeyD') { // right
            pacman.nextDirection = RIGHT_DIRECTION
        } else if (e.code === 'ArrowDown' || e.code === 'KeyS') { // down
            pacman.nextDirection = BOTTOM_DIRECTION
        }
    })
})