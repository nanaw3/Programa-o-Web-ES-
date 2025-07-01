import { TAMX } from "./config.js"
import { space } from "./space.js"

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
]

class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.lasers = []  // array local
    this.element.src = directions[this.direction]
    this.element.style.bottom = "20px"
    this.element.style.left = `${TAMX / 2 - 50}px`
    space.element.appendChild(this.element)
  }

  setLaserArray(laserArray) {
    this.lasers = laserArray
  }

  changeDirection(giro) {
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro
    this.element.src = directions[this.direction]
  }

  move() {
    const currentLeft = parseInt(this.element.style.left)
    const shipWidth = this.element.offsetWidth
    const spaceWidth = space.element.offsetWidth

    if (this.direction === 0) {
      const newLeft = currentLeft - 1
      if (newLeft >= 0) {
        this.element.style.left = `${newLeft}px`
      }
    }

    if (this.direction === 2) {
      const newLeft = currentLeft + 1
      if (newLeft + shipWidth <= spaceWidth) {
        this.element.style.left = `${newLeft}px`
      }
    }
  }

  shoot() {
    const laser = document.createElement("img")
    laser.src = "assets/png/laserGreen.png"
    laser.className = "laser"
    laser.style.position = "absolute"
    laser.style.width = "10px"
    laser.style.top = `${this.element.offsetTop}px`
    laser.style.left = `${this.element.offsetLeft + this.element.offsetWidth / 2 - 5}px`
    space.element.appendChild(laser)
    this.lasers.push(laser)
  }
}

export const ship = new Ship()
