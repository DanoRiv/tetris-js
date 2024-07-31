import { checkCollision } from './game'
import { drawNextPiece } from './nextPiece'

export const PIECES = [
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

export const piece = {
  position: { x: 5, y: 5 },
  shape: PIECES[Math.floor(Math.random() * PIECES.length)]
}

let currentPiece = piece.shape

export function rotation () {
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
// Siguiente pieza
export function nextPiece () {
  const nextPiece = PIECES[Math.floor(Math.random() * PIECES.length)]
  drawNextPiece(nextPiece)
  piece.shape = currentPiece
  currentPiece = nextPiece
}
