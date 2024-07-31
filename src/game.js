import { BOARD_WIDTH } from '../consts'
import { board } from './board'
import { nextPiece, piece, rotation } from './pieces'

let dropCounter = 0
let lastTime = 0

export let score = 0

export function autoDrop (time = 0) {
  const deltaTime = time - lastTime
  lastTime = time
  const dropSpeed = score < 999 ? 1000 - score : 999

  dropCounter += deltaTime

  if (dropCounter > dropSpeed) {
    piece.position.y++
    dropCounter = 0

    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  }
  if (event.key === 'ArrowRight') {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  }
  if (event.key === 'ArrowDown') {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }

  if (event.key === 'ArrowUp') {
    rotation()
  }
})

export function checkCollision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      )
    })
  })
}

// 6. Asegurar pieza al final

export function solidifyPiece () {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2)
  piece.position.y = 0

  // random piece
  // piece.shape = currentPiece
  nextPiece()
  gameOver()
}

// 11. Game Over
function gameOver () {
  if (checkCollision()) {
    window.alert('Game Over')
    board.forEach((row) => row.fill(0))
    score = 0
  }
}

// 7. Remover filas completas

export function removeRows () {
  const rowsToRemove = []

  board.forEach((row, y) => {
    if (row.every((value) => value === 1)) {
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach((y) => {
    board.splice(y, 1)
    const newRow = Array(BOARD_WIDTH).fill(0)
    board.unshift(newRow)
    score += 10
  })
}
