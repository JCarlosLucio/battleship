import Gameboard from './gameboard';
import Player from './player';
import Drag from './drag';
import gameboardView from '../../views/gameboardView';
import { elements } from '../../views/base';

// INIT
const Game = (type) => {
  // Create boards
  const p1Board = Gameboard();
  const p2Board = Gameboard();

  // Create Players
  let p1 = Player('human');
  let p2;
  if (type === 'singleplayer') {
    p2 = Player('computer');
    p2Board.autoPlaceFleet(p2.getFleet());
  } else {
    p2 = Player('human');
  }

  // Create drag for Drag-N-Drop
  const drag = Drag(p1, p1Board);

  // Reset Game
  const resetGame = (type) => {
    p1Board.reset();
    p2Board.reset();
    p1 = Player('human');
    if (type === 'singleplayer') {
      p2 = Player('computer');
      p2Board.autoPlaceFleet(p2.getFleet());
    } else {
      p2 = Player('human');
    }
  };

  const renderFleet = () => {
    gameboardView.renderFleet(p1.getFleet());
    drag.addDragAndDropEvenListeners();
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
      if (p1Board.areAllShipsSunk() || p2Board.areAllShipsSunk()) {
        let winner = '';
        if (p1Board.areAllShipsSunk()) {
          winner = 'Player 2';
        } else if (p2Board.areAllShipsSunk()) {
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
    p1Board.autoPlaceFleet(p1.getFleet());
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
    autoPlace,
    startGame,
    playAgain,
  };
};

export default Game;
