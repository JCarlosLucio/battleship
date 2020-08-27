const Gameboard = () => {
  // create a board 10x10, coords board[row][col];
  const board = Array(10).fill(null).map(() => Array(10).fill(null));

  const getBoard = () => board;

  // place ship at coords (y, x)
  const placeShip = (ship, y0, x0) => {
    const direction = ship.getDirection();
    // checks if out-of-bounds/collision
    if (checkValid(ship.length, direction, y0, x0)) {
      for (let i = 0; i < ship.length; i++) {
        // default: horizontal
        let x = x0 + i;
        let y = y0;
        if (direction === 'vertical') {
          x = x0;
          y = y0 + i;
        }
        // places ship w/index
        board[y][x] = { ship, index: i };
      }
    }
  };

  const checkValid = (length, direction, y0, x0) => {
    const cells = [];
    for (let i = 0; i < length; i++) {
      // default: horizontal
      let x = x0 + i;
      let y = y0;
      if (direction === 'vertical') {
        x = x0;
        y = y0 + i;
      }
      cells.push(board[y][x]);
    }
    return cells.every((cell) => cell === null);
  };

  const receiveAttack = (y, x) => {
    // determines whether or not the attack hit a ship
    if (board[y][x] === null) {
      // records missed shot
      board[y][x] = 'miss';
    } else if (board[y][x].ship) {
      // calls ‘hit’ function of the correct ship
      board[y][x].ship.hit(board[y][x].index);
    }
    // todo: check if cell has already been attacked/missed
  };

  return { getBoard, placeShip, receiveAttack };
};

export default Gameboard;
