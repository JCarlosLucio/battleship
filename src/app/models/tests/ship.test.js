// SHIP TEST ( length, hit(), isSunk() )

import Ship from '../factories/ship';

describe('Ship Factory', () => {
  describe('properties', () => {
    const ship = Ship('battleship');
    test('id', () => {
      expect(ship.id).toBe('battleship');
    });
    test('length', () => {
      expect(ship.length).toBe(4);
    });
    test('direction', () => {
      expect(ship.getDirection()).toBe('horizontal');
    });
  });

  describe('hit function', () => {
    const ship = Ship('submarine');
    test('no hits', () => {
      expect(ship.getHits()).toEqual([null, null, null]);
    });
    test('one hit', () => {
      ship.hit(2);
      expect(ship.getHits()).toEqual([null, null, 'hit']);
    });
  });

  describe('isSunk function', () => {
    const ship = Ship('destroyer');
    test('not sunk', () => {
      expect(ship.isSunk()).toBe(false);
    });
    test('hit but not sunk', () => {
      ship.hit(0);
      expect(ship.isSunk()).toBe(false);
    });
    test('sunk', () => {
      ship.hit(1);
      expect(ship.isSunk()).toBe(true);
    });
  });
});
