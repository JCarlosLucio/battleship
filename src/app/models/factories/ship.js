const SHIP_LENGTHS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

const Ship = (type) => {
  // properties
  const id = type;
  const length = SHIP_LENGTHS[type];
  let direction = 'horizontal';

  const getDirection = () => direction;
  const changeDirection = () => {
    direction === 'horizontal'
      ? (direction = 'vertical')
      : (direction = 'horizontal');
  };

  // hit(i)
  const hits = Array(length).fill(null);
  const hit = (i) => (hits[i] = 'hit');
  const getHits = () => hits;

  // isSunk
  const isSunk = () => hits.every((h) => h === 'hit');

  return { id, length, hit, getHits, isSunk, getDirection, changeDirection };
};

export default Ship;
