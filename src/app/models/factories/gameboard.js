const Gameboard = () => {
  // create a board 10x10, coords board[row][col];
  const board = Array(10).fill(null).map(() => Array(10).fill(null));

  const getBoard = () => board;

  // place ship at coords (y, x)
  const placeShip = (ship, y0, x0) => {
    const direction = ship.getDirection();
    // todo: check if invalid (out of bounds/collision)
    for (let i = 0; i < ship.length; i++) {
      // default: horizontal
      let x = x0 + i;
      let y = y0;
      if (direction === 'vertical') {
        x = x0;
        y = y0 + i;
      }
      board[y][x] = { ship, index: i };
    }
  };

  return { getBoard, placeShip };
};

export default Gameboard;
