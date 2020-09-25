import Gameboard from './gameboard';
import Player from './player';
import Drag from './drag';
import gameboardView from '../../views/gameboardView';
import { elements } from '../../views/base';

// INIT
const Game = (type) => {
  // Create Players
  const p1 = Player('human');
  let p2;
  if (type === 'singleplayer') {
    p2 = Player('computer');
  } else {
    p2 = Player('human');
  }

  // Create boards
  const p1Board = Gameboard();
  const p2Board = Gameboard();

  // Create drag for Drag-N-Drop
  const drag = Drag(p1, p1Board);

  // Reset Game
  const resetGame = () => {
    p1.resetFleet();
    p2.resetFleet();
    p1Board.reset();
    p2Board.reset();
  };

  const addRotateEventListeners = () => {
    const ships = document.querySelectorAll('.ship');
    ships.forEach((ship) => {
      ship.addEventListener('dblclick', (e) => {
        const shipElement = e.target.parentElement;
        const ship = p1.getFleet()[shipElement.dataset.ship];
        ship.changeDirection();
        shipElement.classList.toggle('vertical');
      });
    });
  };

  const renderFleet = () => {
    gameboardView.renderFleet(p1.getFleet());
    drag.addDragAndDropEvenListeners();
    addRotateEventListeners();
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
          winner = 'Computer wins!';
        } else if (p2Board.areAllShipsSunk()) {
          winner = 'You win!';
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
    if (p2.getType() === 'computer') p2Board.autoPlaceFleet(p2.getFleet());
    gameboardView.startGame();
  };

  const playAgain = () => {
    resetGame();
    renderGrids();
    gameboardView.playAgain();
    renderFleet();
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
