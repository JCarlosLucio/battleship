import Gameboard from './models/factories/gameboard';
import Player from './models/factories/player';
import gameboardView from './views/gameboardView';
import { elements } from './views/base';
import '../styles/main.scss';

// INIT
// 1. Create Players/Boards
const p1 = Player('human');
const p2 = Player('computer');

const p1Board = Gameboard();
const p2Board = Gameboard();

// 2. Render Empty Grids
// gameboardView.renderGrid(elements.p1Grid, p1Board);
// gameboardView.renderGrid(elements.p2Grid, p2Board);

// 3. Place Ships... for now autoPlaceFleet (later button and/or drag-n-drop)
p1Board.autoPlaceFleet(p1.getFleet());
p2Board.autoPlaceFleet(p2.getFleet());

// 4. Update grid w/placed Ships (later only show player board if vs 'computer')
gameboardView.renderGrid(elements.p1Grid, p1Board);
gameboardView.renderGrid(elements.p2Grid, p2Board);

// 5. ctrlAttack function for eventListeners
const ctrlAttack = (e) => {
  const cell = e.target;
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
    gameboardView.renderGrid(elements.p1Grid, p1Board);
    gameboardView.renderGrid(elements.p2Grid, p2Board);
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
    // 7. Display WiNNER
    // 8. Display 'Play Again? Button'
  }
};

// 6. EventListener for p1 'human' player
elements.p2Grid.addEventListener('click', ctrlAttack);
