import { BLOCK_SIZE, MINIBOARD_SIZE } from '../consts'

const nextCanvas = document.querySelector('.nextPiece')
const nextCtx = nextCanvas.getContext('2d')

nextCanvas.width = BLOCK_SIZE * MINIBOARD_SIZE
nextCanvas.height = BLOCK_SIZE * MINIBOARD_SIZE

nextCtx.scale(BLOCK_SIZE, BLOCK_SIZE)

export function drawNextPiece (nextPiece) {
  nextCtx.fillStyle = '#000'
  nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height)
  nextPiece.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        nextCtx.fillStyle = 'red'
        nextCtx.fillRect(x + 2, y + 2, 1, 1)
        nextCtx.strokeStyle = 'white'
        nextCtx.lineWidth = 0.02
        nextCtx.strokeRect(x + 2, y + 2, 1, 1)
      }
    })
  })
}
