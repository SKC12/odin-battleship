import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("Adding ship", () => {
  let gameboard = Gameboard();
  let ship = Ship(3);
  gameboard.addShip(0, 0, "horizontal", ship);
  expect(gameboard.getBoard()[0][0]).toBe(ship);
  expect(gameboard.getBoard()[1][0]).toBe(ship);
  expect(gameboard.getBoard()[2][0]).toBe(ship);
  expect(gameboard.getBoard()[3][0]).toBe(".");
  expect(gameboard.getBoard()[0][1]).toBe(".");
  expect(() => gameboard.addShip(9, 1, "horizontal", ship)).toThrow(
    "Invalid Placement"
  );

  gameboard.addShip(5, 3, "vertical", ship);
  expect(gameboard.getBoard()[5][3]).toBe(ship);
  expect(gameboard.getBoard()[5][4]).toBe(ship);
  expect(gameboard.getBoard()[5][5]).toBe(ship);
  expect(gameboard.getBoard()[5][6]).toBe(".");
  expect(gameboard.getBoard()[5][2]).toBe(".");
  expect(gameboard.getBoard()[4][3]).toBe(".");
  expect(gameboard.getBoard()[6][3]).toBe(".");
  expect(() => gameboard.addShip(0, 8, "vertical", ship)).toThrow(
    "Invalid Placement"
  );
});

test("receive attack", () => {
  let gameboard = Gameboard();
  let ship = Ship(3);
  gameboard.addShip(0, 0, "horizontal", ship);
  gameboard.receiveAttack(5, 5);
  expect(gameboard.getBoard()[5][5]).toBe("X");
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(0, 0);
  expect(gameboard.getBoard()[0][0].isSunk()).toEqual(false);
  gameboard.receiveAttack(2, 0);
  expect(gameboard.getBoard()[0][0].isSunk()).toEqual(true);
});

test("All sunk", () => {
  let gameboard = Gameboard();
  expect(gameboard.allSunk()).toEqual(true);
  let ship = Ship(2);
  let ship2 = Ship(3);
  gameboard.addShip(0, 0, "horizontal", ship);
  gameboard.addShip(5, 5, "vertical", ship2);
  expect(gameboard.allSunk()).toEqual(false);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(0, 0);
  expect(gameboard.allSunk()).toEqual(false);
  gameboard.receiveAttack(5, 5);
  gameboard.receiveAttack(5, 6);
  expect(gameboard.allSunk()).toEqual(false);
  gameboard.receiveAttack(5, 7);
  expect(gameboard.allSunk()).toEqual(true);
});
