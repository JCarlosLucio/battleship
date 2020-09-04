import { randCoords } from '../helpers/helpers';

const Player = (type = 'human') => {
  const getType = () => type;

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

  return { getType, attack, autoAttack };
};

export default Player;
