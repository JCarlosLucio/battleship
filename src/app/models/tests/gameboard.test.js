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

  describe('place horizontal ship', () => {
    const gameboard = Gameboard();
    const ship = Ship('cruiser');
    gameboard.placeShip(ship, 3, 2);

    test('placed ship at starter coord w/index: 0', () => {
      const actual = gameboard.getBoard()[3][2];
      expect(actual).toEqual({ ship, index: 0 });
    });
    test('placed ship at coord w/index: 1', () => {
      const actual = gameboard.getBoard()[3][3];
      expect(actual).toEqual({ ship, index: 1 });
    });
    test('placed ship at final coord w/index: 2', () => {
      const actual = gameboard.getBoard()[3][4];
      expect(actual).toEqual({ ship, index: 2 });
    });
  });
  describe('place vertical ship', () => {
    const gameboard = Gameboard();
    const ship = Ship('submarine');
    ship.changeDirection();
    gameboard.placeShip(ship, 3, 2);

    test('placed ship at starter coord w/index: 0', () => {
      const actual = gameboard.getBoard()[3][2];
      expect(actual).toEqual({ ship, index: 0 });
    });
    test('placed ship at coord w/index: 1', () => {
      const actual = gameboard.getBoard()[4][2];
      expect(actual).toEqual({ ship, index: 1 });
    });
    test('placed ship at final coord w/index: 2', () => {
      const actual = gameboard.getBoard()[5][2];
      expect(actual).toEqual({ ship, index: 2 });
    });
  });

  describe('NOT place out-of-bounds ship', () => {
    const gameboard = Gameboard();
    const carrier = Ship('carrier');

    test('out-of-bounds ship horizontal', () => {
      gameboard.placeShip(carrier, 7, 7); // [7,7],[7,8],[7,9],[7,10],[7,11]
      const actual = gameboard.getBoard()[7][7];
      expect(actual).toEqual(null);
    });
    test('out-of-bounds ship vertical', () => {
      carrier.changeDirection();
      gameboard.placeShip(carrier, 7, 7); // [7,7],[8,7],[9,7],[10,7],[11,7]
      const actual = gameboard.getBoard()[7][7];
      expect(actual).toEqual(null);
    });
  });

  describe('NOT place if collision w/ship', () => {
    const gameboard = Gameboard();
    const carrier = Ship('carrier');
    const battleship = Ship('battleship');

    test('collision w/ship', () => {
      gameboard.placeShip(carrier, 2, 0); // [2,0],[2,1],[2,2],[2,3],[2,4]
      gameboard.placeShip(battleship, 2, 0); // [2,0],[2,1],[2,2],[2,3]
      const actual = gameboard.getBoard()[2][0];
      expect(actual).toEqual({ ship: carrier, index: 0 });
    });
    test('collision w/ship 1 place', () => {
      battleship.changeDirection();
      gameboard.placeShip(battleship, 0, 2); // [0,2],[1,2],[2,2],[3,2]
      const actual = gameboard.getBoard()[0][2];
      expect(actual).toEqual(null);
    });
  });

  describe('receive attack', () => {
    const gameboard = Gameboard();
    const carrier = Ship('carrier');
    const battleship = Ship('battleship');
    gameboard.placeShip(carrier, 2, 0); // [2,0],[2,1],[2,2],[2,3],[2,4]
    battleship.changeDirection();
    gameboard.placeShip(battleship, 3, 2); // [3,2],[4,2],[5,2],[6,2]
    gameboard.receiveAttack(0, 0);

    test('attack a carrier at index 0', () => {
      gameboard.receiveAttack(2, 0);
      const actual = carrier.getHits();
      expect(actual).toEqual(['hit', null, null, null, null]);
    });
    test('attack a carrier at index 3', () => {
      gameboard.receiveAttack(2, 3);
      const actual = carrier.getHits();
      expect(actual).toEqual(['hit', null, null, 'hit', null]);
    });
    test('miss', () => {
      const actual = gameboard.getBoard()[0][0];
      expect(actual).toEqual('miss');
    });
    test('hit at cell (2,0)', () => {
      const actual = gameboard.getBoard()[2][0];
      expect(actual).toEqual('hit');
    });
    test('hit at cell (2,3)', () => {
      const actual = gameboard.getBoard()[2][3];
      expect(actual).toEqual('hit');
    });
  });

  describe('are ships sunk', () => {
    const gameboard = Gameboard();
    const submarine = Ship('submarine');
    const destroyer = Ship('destroyer');
    gameboard.placeShip(submarine, 2, 0); // [2,0],[2,1],[2,2]
    destroyer.changeDirection();
    gameboard.placeShip(destroyer, 3, 2); // [3,2],[4,2]

    test('NO ship is sunk', () => {
      const actual = gameboard.areShipsSunk();
      expect(actual).toEqual(false);
    });
    test('1 ship has sunk', () => {
      gameboard.receiveAttack(2, 0);
      gameboard.receiveAttack(2, 1);
      gameboard.receiveAttack(2, 2);
      const actual = gameboard.areShipsSunk();
      expect(actual).toEqual(false);
    });
    test('all ships have sunk', () => {
      gameboard.receiveAttack(3, 2);
      gameboard.receiveAttack(4, 2);
      const actual = gameboard.areShipsSunk();
      expect(actual).toEqual(true);
    });
  });
});
