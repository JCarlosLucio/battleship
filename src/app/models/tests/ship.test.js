// SHIP TEST ( length, hit(), isSunk() )

import Ship from '../factories/ship';

describe('Ship Factory', () => {
  test('length', () => {
    const ship = Ship('battleship');
    expect(ship.length).toBe(4);
  });
});
