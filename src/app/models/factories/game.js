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
    addDragAndDropEvenListeners();
  };

  //  ===== Drag N Drop - (for now for p1 only) ===
  const addDragAndDropEvenListeners = () => {
    const ships = document.querySelectorAll('.ship');
    const cells = elements.p1Grid.childNodes;
    // Add EventListener to know which index is being held when dragging
    ships.forEach((ship) =>
      ship.addEventListener('mousedown', getDraggedShipIndex)
    );
    // Add EventListners for drag/drop events
    ships.forEach((ship) => ship.addEventListener('dragstart', dragStart));
    // cells.forEach((cell) => cell.addEventListener('dragstart', dragStart));
    cells.forEach((cell) => cell.addEventListener('dragover', dragOver));
    cells.forEach((cell) => cell.addEventListener('dragenter', dragEnter));
    cells.forEach((cell) => cell.addEventListener('dragleave', dragLeave));
    cells.forEach((cell) => cell.addEventListener('drop', dragDrop));
    cells.forEach((cell) => cell.addEventListener('dragend', dragEnd));
  };

  let draggedShip;
  let draggedShipIndex;
  // console.log(draggedShip);

  const getDraggedShipIndex = (e) => {
    draggedShipIndex = e.target.dataset.index;
    // console.log(draggedShipIndex);
  };

  const dragStart = (e) => {
    draggedShip = e.target;
    console.log('start', { draggedShip });
  };
  const dragOver = (e) => {
    e.preventDefault();
    // console.log('Over');
  };
  const dragEnter = (e) => {
    e.preventDefault();
    // console.log('Enter');
  };
  const dragLeave = (e) => {
    // console.log('Leave');
  };
  const dragDrop = (e) => {
    // get cell
    const cell = e.target;
    // get coords - adjust coords according to draggedShipIndex
    // todo - adjust coords for direction
    const y = Number(cell.dataset.y);
    const x = Number(cell.dataset.x) - Number(draggedShipIndex);
    // get ship
    const p1Ship = p1.getFleet()[draggedShip.dataset.ship];
    console.log('DROP', draggedShip, p1Ship, { x }, { y });
    // place ship and get outcome
    const outcome = p1Board.placeShip(p1Ship, y, x);
    console.log(outcome);
    if (outcome) {
      // update grid
      gameboardView.renderGrid(elements.p1Grid, p1Board, p1.getType());
      addDragAndDropEvenListeners();
      // remove ship from fleet container
      elements.fleetContainer.removeChild(draggedShip);
      // todo - show START button after last ship has been placed
      // todo - enemy autoPlaceFleet
    }
  };
  const dragEnd = (e) => {
    // console.log('End');
  };
  // ==== Ends Drag-n-Drop ====

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
