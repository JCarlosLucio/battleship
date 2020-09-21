import { SHIP_TYPES, randCoords, createFleet } from '../helpers/helpers';

const Player = (type = 'human') => {
  let fleet = createFleet(SHIP_TYPES);

  const getType = () => type;
  const getFleet = () => fleet;

  // Attacks enemyBoard at coords [y][x];
  const attack = (y, x, enemyBoard) => enemyBoard.receiveAttack(y, x);

  const autoAttack = (enemyBoard) => {
    const [y, x] = randCoords();
    const cell = enemyBoard.getBoard()[y][x];
    if (cell === 'miss' || cell === 'hit') {
      // tries again until a valid cell is picked
      autoAttack(enemyBoard);
    } else {
      // attacks a valid cell
      enemyBoard.receiveAttack(y, x);
    }
  };

  const resetFleet = () => (fleet = createFleet(SHIP_TYPES));

  return { getType, getFleet, attack, autoAttack, resetFleet };
};

export default Player;
