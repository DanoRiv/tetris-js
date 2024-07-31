import '../style.css'
import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH } from '../consts'
import { board } from './board'
import { nextPiece, piece } from './pieces'
import { autoDrop, score } from './game'

// 1. inicializar el canvas
const canvas = document.querySelector('.mainBoard')
const context = canvas.getContext('2d')
const $score = document.querySelector('span')

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

function update (time = 0) {
  autoDrop(time)
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

  // 10. Puntaje
  $score.innerText = score
}

const startGame = document.querySelector('.gameStart')

startGame.addEventListener('click', () => {
  nextPiece()
  update()
  startGame.remove()
})
