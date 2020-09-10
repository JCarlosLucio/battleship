import Game from './models/factories/game';
import { elements } from './views/base';
import '../styles/main.scss';

// Event listeners

// 1. Event Listener for game type singleplayer / multiplayer (for now only singleplayer)
const game = Game('singleplayer');
// 1.1 render empty grids
game.render();

// 2. EventListener for Auto-Place button or Drag-n-drop
elements.autoPlaceBtn.addEventListener('click', (e) => {
  console.log('autoplaced both players fleets');
  // 2.1 Update grids
  game.autoPlace();
});

// 3. EventListener for Start Game
game.addGridEventListeners();

// 4. EventListener for Play Again?
