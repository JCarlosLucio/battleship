import Player from '../factories/player';
import Gameboard from '../factories/gameboard';

// Setup
const player = Player();
const enemy = Player();
const playerBoard = Gameboard();
const enemyBoard = Gameboard();

describe('Player attack', () => {
  test('attack enemy board', () => {
    player.attack(2, 3, enemyBoard);
    const actual = enemyBoard.getBoard()[2][3];
    expect(actual).toBe('miss');
  });
});

describe('Auto attack', () => {
  test('attack enemy board', () => {
    enemy.autoAttack(playerBoard);

    const actual = playerBoard.getBoard().flat().every((cell) => cell === null);
    expect(actual).toBe(false);
  });
});
