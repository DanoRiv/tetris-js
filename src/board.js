import { BOARD_HEIGHT, BOARD_WIDTH } from '../consts'

const createBoard = (height, width) => {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(0))
}

export const board = createBoard(BOARD_HEIGHT, BOARD_WIDTH)
