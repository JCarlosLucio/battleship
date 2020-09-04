// CONSTANTS
export const SHIP_TYPES = [
  'carrier',
  'battleship',
  'cruiser',
  'submarine',
  'destroyer',
];

export const SHIP_LENGTHS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

// FUNCTIONS
const rand = (size = 10) => Math.floor(Math.random() * size);

export const randCoords = (size = 10) => [rand(size), rand(size)];

export const createFleet = (types) => {
  // creates an object of Ships
  // fleet = {carrier: {id: "carrier", length: 5, ...}, ...otherShips}
  const fleet = {};
  types.forEach((type) => (fleet[type] = Ship(type)));
  return fleet;
};
