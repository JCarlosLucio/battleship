import { elements } from '../../views/base';
import gameboardView from '../../views/gameboardView';

const Drag = (p1, p1Board) => {
  let draggedShip;
  let draggedShipIndex;
  // console.log(draggedShip);

  //  Drag-N-Drop (for now for p1 only)
  const getDraggedShipIndex = (e) => {
    draggedShipIndex = Number(e.target.dataset.index);
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
    // get ship
    const p1Ship = p1.getFleet()[draggedShip.dataset.ship];
    // get direction
    const isHorizontal = p1Ship.getDirection() === 'horizontal';
    // get/adjust coords according to isHorizontal w/draggedShipIndex
    const y = Number(cell.dataset.y) - (isHorizontal ? 0 : draggedShipIndex);
    const x = Number(cell.dataset.x) - (isHorizontal ? draggedShipIndex : 0);

    // place ship and get outcome
    const outcome = p1Board.placeShip(p1Ship, y, x);
    console.log('DROP', { outcome }, { x }, { y }, p1Ship);

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

  const addDragAndDropEvenListeners = () => {
    const ships = document.querySelectorAll('.ship');
    const cells = elements.p1Grid.childNodes;

    // Add EventListener to know which index is being held when dragging
    // Add EventListners for drag/drop events
    for (const ship of ships) {
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
