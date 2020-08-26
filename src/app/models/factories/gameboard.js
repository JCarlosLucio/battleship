const Gameboard = () => {
  // create a board 10x10, coords board[row][col];
  const board = Array(10).fill(null).map(() => Array(10).fill(null));

  const getBoard = () => board;

  // place ship at coords (y, x)
  const placeShip = (ship, y, x) => {
    board[y][x] = ship;
  };

  return { getBoard, placeShip };
};

export default Gameboard;
