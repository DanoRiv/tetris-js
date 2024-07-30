import './style.css'
import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH } from './consts'
import { drawNextPiece } from './nextPiece'

// 1. inicializar el canvas
const canvas = document.querySelector('.mainBoard')
const context = canvas.getContext('2d')
const $score = document.querySelector('span')

let score = 0

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// 3. Board

const createBoard = (height, width) => {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(0))
}

const board = createBoard(BOARD_HEIGHT, BOARD_WIDTH)

const PIECES = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 1]
  ],
  [
    [0, 0, 1],
    [1, 1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ]
]

// 4. pieza actual
const piece = {
  position: { x: 5, y: 5 },
  shape: PIECES[Math.floor(Math.random() * PIECES.length)]
}

let currentPiece = piece.shape

// 2. Game Loop

// function update() {
//   draw()
//   window.requestAnimationFrame(update)
// }

// 8. autodrop

let dropCounter = 0
let lastTime = 0

function update (time = 0) {
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

  draw()
  window.requestAnimationFrame(update)
}

function drawMatrix (matrix, offset, color) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = color
        context.fillRect(x + offset.x, y + offset.y, 1, 1)
        context.strokeStyle = 'white'
        context.lineWidth = 0.02
        context.strokeRect(x + offset.x, y + offset.y, 1, 1)
      }
    })
  })
}

function draw () {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)

  drawMatrix(board, { x: 0, y: 0 }, '#47b8ee')
  drawMatrix(piece.shape, piece.position, '#c84a25')
  // board.forEach((row, y) => {
  //   row.forEach((value, x) => {
  //     if (value === 1) {
  //       context.fillStyle = '#47b8ee'
  //       context.fillRect(x, y, 1, 1)
  //       context.strokeStyle = 'white'
  //       context.lineWidth = 0.02
  //       context.strokeRect(x, y, 1, 1)
  //     }
  //   })
  // })
  // piece.shape.forEach((row, y) => {
  //   row.forEach((value, x) => {
  //     if (value) {
  //       context.fillStyle = '#c84a25'
  //       context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
  //       context.strokeStyle = 'white'
  //       context.lineWidth = 0.02
  //       context.strokeRect(x + piece.position.x, y + piece.position.y, 1, 1)
  //     }
  //   })
  // })

  // 10. Puntaje
  $score.innerText = score
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

// 9. Rotaciones
function rotation () {
  const rotatedPiece = []
  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = []
    for (let j = piece.shape.length - 1; j >= 0; j--) {
      row.push(piece.shape[j][i])
    }
    rotatedPiece.push(row)
  }

  const previousShape = piece.shape
  piece.shape = rotatedPiece
  if (checkCollision()) {
    piece.shape = previousShape
  }
}

// 5. Verificar colisiones

function checkCollision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      )
    })
  })
}

// 6. Asegurar pieza al final

function solidifyPiece () {
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
  piece.shape = currentPiece
  nextPiece()

  // 11. Game Over
  if (checkCollision()) {
    window.alert('Game Over')
    board.forEach((row) => row.fill(0))
    score = 0
  }
}

// Siguiente pieza
function nextPiece () {
  const nextPiece = PIECES[Math.floor(Math.random() * PIECES.length)]
  drawNextPiece(nextPiece)
  currentPiece = nextPiece
}

// 7. Remover filas completas

function removeRows () {
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

const startGame = document.querySelector('.gameStart')

startGame.addEventListener('click', () => {
  nextPiece()
  update()
  startGame.remove()
})
