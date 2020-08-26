const SHIP_LENGTHS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

const Ship = (type) => {
  // id
  const id = type;

  // length
  const length = SHIP_LENGTHS[type];

  // hit(i)
  const hits = Array(length).fill(null);
  const hit = (i) => (hits[i] = 'hit');
  const getHits = () => hits;

  // isSunk
  const isSunk = () => hits.every((h) => h === 'hit');

  return { id, length, hit, getHits, isSunk };
};

export default Ship;
