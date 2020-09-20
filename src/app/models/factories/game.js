import Gameboard from './gameboard';
import Player from './player';
import gameboardView from '../../views/gameboardView';
import { elements } from '../../views/base';

// INIT
const Game = (type) => {
  // Create Players
  let p1 = Player('human');
  let p2;
  if (type === 'singleplayer') {
    p2 = Player('computer');
  } else {
    p2 = Player('human');
  }

  // Create boards
  const p1Board = Gameboard();
  const p2Board = Gameboard();

  // Reset Game
  const resetGame = (type) => {
    p1 = Player('human');
    if (type === 'singleplayer') {
      p2 = Player('computer');
    } else {
      p2 = Player('human');
    }
    p1Board.reset();
    p2Board.reset();
  };

  const renderFleet = () => {
    gameboardView.renderFleet(p1.getFleet());
    // add Drag-N-Drop EventListeners
  };

  //  ===== Drag N Drop - (for now for p1 only) ===
  const addDragAndDropEvenListeners = () => {
    const cells = elements.p1Grid.childNodes;
    // Add EventListners for drag/drop events
    ships.forEach((ship) => ship.addEventListener('dragstart', dragStart));
    // cells.forEach((cell) => cell.addEventListener('dragstart', dragStart));
    cells.forEach((cell) => cell.addEventListener('dragover', dragOver));
    cells.forEach((cell) => cell.addEventListener('dragenter', dragEnter));
    cells.forEach((cell) => cell.addEventListener('dragleave', dragLeave));
    cells.forEach((cell) => cell.addEventListener('drop', dragDrop));
    cells.forEach((cell) => cell.addEventListener('dragend', dragEnd));
  };

  //  EventListener for p1 'human' player
  const addGridEventListeners = () => {
    if (p2.getType === 'human')
      elements.p1Grid.addEventListener('click', ctrlAttack);
    elements.p2Grid.addEventListener('click', ctrlAttack);
  };

  // ctrlAttack function for eventListeners
  const ctrlAttack = (e) => {
    const cell = e.target;
    if (cell.classList.contains('grid-cell')) {
      // 1. Get coords from cell
      const y = cell.dataset.y;
      const x = cell.dataset.x;

      // 2. Checks that board cell hasn't been attacked
      const boardCell = p2Board.getBoard()[y][x];
      if (boardCell !== 'miss' && boardCell !== 'hit') {
        // 3. Makes Attacks for p1 'human' and p2 'computer'
        p1.attack(y, x, p2Board);
        p2.autoAttack(p1Board);

        // 4. Updates grids after attacks to show outcome
        renderGrids();
      }
      // 5. Checks if all ships are sunk
      if (p1Board.areShipsSunk() || p2Board.areShipsSunk()) {
        let winner = '';
        if (p1Board.areShipsSunk()) {
          winner = 'Player 2';
        } else if (p2Board.areShipsSunk()) {
          winner = 'Player 1';
        }
        // 6. Disable eventListeners for attacks
        elements.p2Grid.removeEventListener('click', ctrlAttack);
        // 7. Display WiNNER / Play Again? Button'
        gameboardView.renderWinner(winner);
      }
    }
  };

  // Render Grids / Update Grids
  const renderGrids = () => {
    gameboardView.renderGrid(elements.p1Grid, p1Board, p1.getType());
    gameboardView.renderGrid(elements.p2Grid, p2Board, p2.getType());
  };

  const autoPlace = () => {
    p1Board.reset();
    p2Board.reset();
    p1Board.autoPlaceFleet(p1.getFleet());
    p2Board.autoPlaceFleet(p2.getFleet());
    renderGrids();
    gameboardView.autoPlace();
  };

  const startGame = () => {
    addGridEventListeners();
    gameboardView.startGame();
  };

  const playAgain = (type) => {
    resetGame(type);
    renderGrids();
    gameboardView.playAgain();
  };

  return {
    renderGrids,
    renderFleet,
    addDragAndDropEvenListeners,
    autoPlace,
    startGame,
    playAgain,
  };
};

export default Game;
