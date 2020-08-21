// SHIP TEST ( length, hit(), isSunk() )

import Ship from '../factories/ship';

describe('Ship Factory', () => {
  test('length', () => {
    const ship = Ship('battleship');
    expect(ship.length).toBe(4);
  });
  describe('hit function', () => {
    test('no hits', () => {
      const ship = Ship('cruiser');
      expect(ship.hits).toStrictEqual([null, null, null]);
    });
    test('one hit', () => {
      const ship = Ship('submarine');
      ship.hit(2);
      expect(ship.hits).toStrictEqual([null, null, 'hit']);
    });
  });
});