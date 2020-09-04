import Player from '../factories/player';
import Gameboard from '../factories/gameboard';

// Setup
const player = Player('human');
const enemy = Player('computer');
const playerBoard = Gameboard();
const enemyBoard = Gameboard();

describe('Player type', () => {
  test('human type', () => {
    const actual = player.getType();
    expect(actual).toBe('human');
  });
  test('computer type', () => {
    const actual = enemy.getType();
    expect(actual).toBe('computer');
  });
});

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
