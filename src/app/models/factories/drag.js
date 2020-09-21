import { elements } from '../../views/base';
import gameboardView from '../../views/gameboardView';

const Drag = (p1, p1Board) => {
  let draggedShip;
  let draggedShipIndex;

  //  Drag-N-Drop (for now for p1 only)
  const getDraggedShipIndex = (e) =>
    (draggedShipIndex = Number(e.target.dataset.index));

  const dragStart = (e) => {
    draggedShip = e.target;
  };
  const dragDrop = (e) => {
    const cell = e.target;
    const p1Ship = p1.getFleet()[draggedShip.dataset.ship];
    const isHorizontal = p1Ship.getDirection() === 'horizontal';
    // get/adjust coords according to isHorizontal w/draggedShipIndex
    const y = Number(cell.dataset.y) - (isHorizontal ? 0 : draggedShipIndex);
    const x = Number(cell.dataset.x) - (isHorizontal ? draggedShipIndex : 0);

    // place ship and get outcome
    const outcome = p1Board.placeShip(p1Ship, y, x);
    if (outcome) {
      // update grid
      gameboardView.renderGrid(elements.p1Grid, p1Board, p1.getType());
      addDragAndDropEvenListeners();
      // remove ship from fleet container
      elements.fleetContainer.removeChild(draggedShip);
      // show START button if all ships are placed
      if (p1Board.areAllShipsPlaced()) elements.startBtn.classList.add('show');
    }
  };

  const dragOver = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();
  const dragLeave = () => {};
  const dragEnd = () => {};

  const addDragAndDropEvenListeners = () => {
    const ships = document.querySelectorAll('.ship');
    const cells = elements.p1Grid.childNodes;

    // Add EventListners for drag/drop events
    for (const ship of ships) {
      // EventListener to know which index is being held when dragging
      ship.addEventListener('mousedown', getDraggedShipIndex);
      ship.addEventListener('dragstart', dragStart);
      ship.addEventListener('dragend', dragEnd);
    }
    for (const cell of cells) {
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', dragDrop);
    }
  };

  return { addDragAndDropEvenListeners };
};

export default Drag;
