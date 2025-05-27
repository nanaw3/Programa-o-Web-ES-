import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { createRandomEnemy, moveEnemies } from "./enemyShip.js"
import { increaseDifficulty } from "./enemyShip.js"


const lasers = []
ship.setLaserArray(lasers)


let gameRunning = false
let gamePaused = false

let score = 0
let lives = 3
const scoreDisplay = document.getElementById("score")
const livesDisplay = document.getElementById("lives")

function updateHUD() {
  scoreDisplay.textContent = `000000${score}`
  livesDisplay.innerHTML = ""
  for (let i = 0; i < lives; i++) {
    const lifeImg = document.createElement("img")
    lifeImg.src = "assets/png/life.png"
    lifeImg.alt = "Vida"
    livesDisplay.appendChild(lifeImg)
  }
}


function init() {
  setInterval(run, 1000 / FPS)
}

window.addEventListener("keydown", (e) => {
  if ((e.key === " " || e.code === "Space")) {
  if (!gameRunning) {
    gameRunning = true
    console.log("Iniciado.")
  } else if (!gamePaused) {
    ship.shoot && ship.shoot()
  }
}

  if (e.key === "p" || e.key === "P") {
    if (gameRunning) {
      gamePaused = !gamePaused
      console.log(gamePaused ? "Pausado" : "Retomado")
    }
  }

  if (e.key === "ArrowLeft") ship.changeDirection(-1)
  if (e.key === "ArrowRight") ship.changeDirection(+1)
})

function run() {
  if (!gameRunning || gamePaused) return

  space.move()
  ship.move()
  createRandomEnemy()
  moveEnemies()
  moveLasers()
  moveLasers()
  checkShipCollision()

}


function moveLasers() {
  for (let i = lasers.length - 1; i >= 0; i--) {
    const laser = lasers[i]
    const currentTop = parseFloat(laser.style.top)
    const newTop = currentTop - 5
    laser.style.top = `${newTop}px`

    if (newTop < 0) {
      laser.remove()
      lasers.splice(i, 1)
      continue
    }

    // colisão com inimigos
    const enemies = document.querySelectorAll("img[data-type]")
    for (const enemy of enemies) {
      const lRect = laser.getBoundingClientRect()
      const eRect = enemy.getBoundingClientRect()

      const isColliding = !(
        lRect.top > eRect.bottom ||
        lRect.bottom < eRect.top ||
        lRect.right < eRect.left ||
        lRect.left > eRect.right
      )

      if (isColliding) {
        const points = parseInt(enemy.dataset.points)
        score += points
        updateHUD()
        enemy.remove()
        laser.remove()
        lasers.splice(i, 1)
        break
      }
    }
  }
}

function checkShipCollision() {
  const shipRect = ship.element.getBoundingClientRect()
  const enemies = document.querySelectorAll("img[data-type]")

  for (const enemy of enemies) {
    const enemyRect = enemy.getBoundingClientRect()

    const isColliding = !(
      shipRect.top > enemyRect.bottom ||
      shipRect.bottom < enemyRect.top ||
      shipRect.right < enemyRect.left ||
      shipRect.left > enemyRect.right
    )

    if (isColliding) {
      enemy.remove()
      lives--
      updateHUD()

      ship.element.src = "assets/png/playerDamaged.png"

      setTimeout(() => {
        ship.element.src = "assets/png/player.png"
      }, 5000)

      if (lives <= 0) {
        gameRunning = false
        showGameOver()
      }

      break
    }
  }
}

function showGameOver() {
  const gameOver = document.createElement("div")
  gameOver.id = "game-over"
  gameOver.innerHTML = `
    <h1>Game Over</h1>
    <button id="restart">Reiniciar</button>
  `
  document.body.appendChild(gameOver)

  document.getElementById("restart").onclick = () => {
    gameOver.remove()
    resetGame()
  }
}

function resetGame() {
  score = 0
  lives = 3
  updateHUD()


  ship.element.style.left = `${space.element.offsetWidth / 2 - ship.element.offsetWidth / 2}px`
  ship.element.src = "assets/png/player.png"


  const enemies = document.querySelectorAll("img[data-type]")
  enemies.forEach(e => e.remove())


  const shots = document.querySelectorAll(".laser")
  shots.forEach(s => s.remove())


  lasers.length = 0

  gameRunning = true
  gamePaused = false
}





init()

setInterval(() => {
  if (gameRunning && !gamePaused) {
    increaseDifficulty()
  }
}, 60000) // a cada 60 segundos


updateHUD()
