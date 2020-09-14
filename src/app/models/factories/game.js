import Gameboard from './gameboard';
import Player from './player';
import gameboardView from '../../views/gameboardView';
import { elements } from '../../views/base';

// INIT
const Game = (type) => {
  // 1. Create Players
  const p1 = Player('human');
  let p2;
  if (type === 'singleplayer') {
    p2 = Player('computer');
  } else {
    p2 = Player('human');
  }

  // 2. Create boards
  const p1Board = Gameboard();
  const p2Board = Gameboard();

  // 2. Render Empty Grids
  const render = () => {
    gameboardView.renderGrid(elements.p1Grid, p1Board, p1.getType());
    gameboardView.renderGrid(elements.p2Grid, p2Board, p2.getType());
  };

  // 3. Place Ships... for now autoPlaceFleet (later button and/or drag-n-drop)
  const autoPlace = () => {
    p1Board.reset();
    p2Board.reset();
    p1Board.autoPlaceFleet(p1.getFleet());
    p2Board.autoPlaceFleet(p2.getFleet());
    render();
  };

  // 5. ctrlAttack function for eventListeners
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
        render();
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

  // 6. EventListener for p1 'human' player
  const addGridEventListeners = () => {
    if (p2.getType === 'human')
      elements.p1Grid.addEventListener('click', ctrlAttack);
    elements.p2Grid.addEventListener('click', ctrlAttack);
  };

  const playAgain = () => {
    p1Board.reset();
    p2Board.reset();
    render();
    gameboardView.toggleShowInfoContainer();
  };
  return { render, autoPlace, addGridEventListeners, playAgain };
};

export default Game;
