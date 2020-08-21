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
  // hit(i)
  const hits = new Array(length).fill(null);
  const hit = (i) => (hits[i] = 'hit');
  // isSunk
  const isSunk = () => hits.every((h) => h === 'hit');
  return { length, hits, hit, isSunk };
};

export default Ship;
