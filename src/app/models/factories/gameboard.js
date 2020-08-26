const Gameboard = () => {
  // create a board 10x10, coords board[row][col];
  const board = Array(10).fill(null).map(() => Array(10).fill(null));

  const getBoard = () => board;

  // place ship at coords (y, x)
  const placeShip = (ship, y0, x0) => {
    const length = ship.length;
    const direction = ship.getDirection();
    // todo: check if invalid (out of bounds/collision)
    if (direction === 'horizontal') {
      for (let i = 0; i < length; i++) {
        board[y0][x0 + i] = { ship, index: i };
      }
    } else {
      for (let y = 0; y < length; y++) {
        board[y0 + i][x0] = { ship, index: y };
      }
    }
  };

  return { getBoard, placeShip };
};

export default Gameboard;
