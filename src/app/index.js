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
  console.log(cell);
};
