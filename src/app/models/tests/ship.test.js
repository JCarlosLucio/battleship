// SHIP TEST ( length, hit(), isSunk() )

import Ship from '../factories/ship';

describe('Ship Factory', () => {
  test('length', () => {
    const ship = Ship('battleship');
    expect(ship.length).toBe(4);
  });
  describe('hit function', () => {
    const ship = Ship('submarine');
    test('no hits', () => {
      expect(ship.hits).toStrictEqual([null, null, null]);
    });
    test('one hit', () => {
      ship.hit(2);
      expect(ship.hits).toStrictEqual([null, null, 'hit']);
    });
  });
  describe('isSunk function', () => {
    const ship = Ship('destroyer');
    test('not sunk', () => {
      expect(ship.isSunk()).toBe(false);
    });
  });
});
