const Ship = (type) => {
  // length
  const lengths = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };
  const length = lengths[type];
  // hit(num)
  // isSunk
  return { length };
};

export default Ship;
