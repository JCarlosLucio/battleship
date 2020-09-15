import { elements } from './base';

const gameboardView = (() => {
  const renderCell = (y, x, status) =>
    `<div class="grid-cell cell-${y}-${x} ${status}" data-y='${y}' data-x='${x}'></div>`;

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
            status = 'placed';
          } else {
            status = '';
          }
        }
        grid += renderCell(i, j, status);
      }
    }
    parent.insertAdjacentHTML('afterbegin', grid);
  };

  const clearGrid = (parent) => {
    parent.textContent = '';
  };

  const renderWinner = (winner) => {
    toggleShow(elements.infoContainer);
    elements.infoText.textContent = `${winner.toUpperCase()} WINS!`;
  };

  const toggleShow = (element) => {
    const elementClasses = element.classList;
    if (elementClasses.contains('show')) {
      elementClasses.remove('show');
    } else {
      elementClasses.add('show');
    }
  };

  return {
    renderGrid,
    renderWinner,
    toggleShow,
  };
})();

export default gameboardView;
