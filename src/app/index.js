import Gameboard from './models/factories/gameboard';
import Player from './models/factories/player';
import gameboardView from './views/gameboardView';
import { elements } from './views/base';
import '../styles/main.scss';

// INIT
// 1. Create Players/Boards
const p1 = Player();
const p2 = Player();

const p1Board = Gameboard();
const p2Board = Gameboard();

// 2. Render Grids
// 3. Place Ships
