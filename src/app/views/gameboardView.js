const renderCell = (y, x) =>
  `<div class="grid-cell cell-${y}-${x}" data-y='${y}' data-x='${x}'></div>`;

export const renderGrid = (size, parent) => {
  let grid = '';
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid += renderCell(i, j);
    }
  }
  parent.insertAdjacentHTML('afterbegin', grid);
};
