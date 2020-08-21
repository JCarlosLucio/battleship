const SHIP_LENGTHS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

const Ship = (type) => {
  // length
  const length = SHIP_LENGTHS[type];
  // hit(num)
  // isSunk
  return { length };
};

export default Ship;
