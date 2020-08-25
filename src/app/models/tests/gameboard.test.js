// GAMEBOARD
// place ships at specific coordinates
// receiveAttack function
// keep track of missed attacks
// report whether or not all of their ships have been sunk

import Gameboard from '../factories/gameboard';

describe('Gameboard', () => {
  describe('board', () => {
    const gameboard = Gameboard();
    test('empty board', () => {
      const actual = gameboard.getBoard().every((square) => square === null);
      const expected = false;
      expect(actual).toBe(expected);
    });
    test('board row', () => {
      const actual = gameboard.getBoard().length;
      const expected = 10;
      expect(actual).toBe(expected);
    });
    test('board column', () => {
      const actual = gameboard.getBoard()[0].length;
      const expected = 10;
      expect(actual).toBe(expected);
    });
  });
});
