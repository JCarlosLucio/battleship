// GAMEBOARD
// place ships at specific coordinates
// receiveAttack function
// keep track of missed attacks
// report whether or not all of their ships have been sunk

import Gameboard from '../factories/gameboard';
import Ship from '../factories/ship';

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

  describe('place ship', () => {
    const gameboard = Gameboard();
    const ship = Ship('cruiser');

    test('places ship at coord', () => {
      gameboard.placeShip(ship, 3, 2);
      const actual = gameboard.getBoard()[3][2];
      expect(actual).toEqual(ship);
    });
  });
});
