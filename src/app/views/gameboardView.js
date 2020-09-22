import { elements } from './base';

const gameboardView = (() => {
  const renderCell = (y, x, status) =>
    `<div class="grid-cell cell-${y}-${x} ${status}" data-y='${y}' data-x='${x}'></div>`;

  const clearGrid = (parent) => {
    parent.textContent = '';
  };

  const renderGrid = (parent, gameboard, type) => {
    clearGrid(parent);
    const board = gameboard.getBoard();
    const length = board.length;
    let grid = '';
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        let status = board[i][j];
        if (status === null) {
          status = '';
        } else if (status.ship) {
          if (type === 'human') {
            status = status.ship.id;
          } else {
            status = '';
          }
        }
        grid += renderCell(i, j, status);
      }
    }
    parent.insertAdjacentHTML('afterbegin', grid);
  };

  const renderFleet = (fleet) => {
    for (const ship in fleet) {
      // create draggable 'ship'-container
      const container = document.createElement('div');
      container.classList.add('ship', `${fleet[ship].id}-container`);
      container.setAttribute('draggable', true);
      container.dataset.ship = `${fleet[ship].id}`;
      // create inner ship divs
      let divs = '';
      for (let i = 0; i < fleet[ship].length; i++) {
        divs += `<div class=${fleet[ship].id} data-index='${i}'></div>`;
      }
      container.insertAdjacentHTML('afterbegin', divs);
      elements.fleetDraggable.prepend(container);
    }
  };

  const autoPlace = () => {
    elements.startBtn.classList.add('show');
    // removes all ships from fleetDraggable
    elements.fleetDraggable.textContent = '';
  };

  const startGame = () => {
    elements.p1Gameboard.classList.toggle('grid-disabled');
    elements.p2Gameboard.classList.toggle('grid-disabled');
    elements.startBtn.classList.remove('show');
    elements.autoPlaceBtn.classList.remove('show');
    elements.fleetContainer.classList.toggle('slide-out');
    elements.fleetContainer.classList.toggle('slide-in');
  };

  const renderWinner = (winner) => {
    elements.infoContainer.classList.toggle('show');
    elements.infoText.textContent = `${winner.toUpperCase()} WINS!`;
  };

  const playAgain = () => {
    elements.infoContainer.classList.toggle('show');
    elements.p1Gameboard.classList.toggle('grid-disabled');
    elements.p2Gameboard.classList.toggle('grid-disabled');
    elements.autoPlaceBtn.classList.add('show');
    elements.fleetContainer.classList.toggle('slide-in');
    elements.fleetContainer.classList.toggle('slide-out');
  };

  return {
    renderGrid,
    renderFleet,
    autoPlace,
    startGame,
    renderWinner,
    playAgain,
  };
})();

export default gameboardView;
