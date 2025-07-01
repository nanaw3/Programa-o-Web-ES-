import { TAMX, PROB_ENEMY_SHIP } from "./config.js"
import { space } from "./space.js"
let speedMultiplier = 1


const enemyTypes = [
  {
    name: "enemyShip",
    src: "assets/png/enemyShip.png",
    width: 50,
    points: 50,
    speedMin: 1.5,
    speedMax: 2.5
  },
  {
    name: "enemyUFO",
    src: "assets/png/enemyUFO.png",
    width: 60,
    points: 20,
    speedMin: 1,
    speedMax: 2
  },
  {
    name: "meteorBig",
    src: "assets/png/meteorBig.png",
    width: 70,
    points: 10,
    speedMin: 0.5,
    speedMax: 1.5
  },
  {
    name: "meteorSmall",
    src: "assets/png/meteorSmall.png",
    width: 40,
    points: 100,
    speedMin: 2,
    speedMax: 3.5
  }
]



const enemies = []

export function createRandomEnemy() {
  if (Math.random() < 0.02) { // frequência de aparição (ajustável)
    const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
    const enemy = document.createElement("img")
    enemy.src = type.src
    enemy.style.position = "absolute"
    enemy.style.width = `${type.width}px`
    enemy.style.top = "0px"
    enemy.style.left = `${Math.random() * (space.element.offsetWidth - type.width)}px`
    enemy.dataset.type = type.name
    enemy.dataset.points = type.points
    const baseSpeed = Math.random() * (type.speedMax - type.speedMin) + type.speedMin
    const speed = (baseSpeed * speedMultiplier).toFixed(2)
    enemy.dataset.speed = speed

    space.element.appendChild(enemy)
    enemies.push(enemy)
  }
}


export function moveEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i]
    const speed = parseFloat(enemy.dataset.speed)
    const currentTop = parseFloat(enemy.style.top)
    enemy.style.top = `${currentTop + speed}px`

    // Remove se sair da tela
    if (currentTop > space.element.offsetHeight) {
      enemy.remove()
      enemies.splice(i, 1)
    }
  }
}

export function increaseDifficulty() {
  speedMultiplier += 0.2 // aumenta 20% a cada minuto (ajustável)
  console.log("Dificuldade aumentada! Multiplicador:", speedMultiplier.toFixed(2))
}
