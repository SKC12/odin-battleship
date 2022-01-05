import { Ship } from "./ship";

test("ship health", () => {
  let ship = Ship(3);
  expect(ship.getHealth()).toEqual(3);
});

test("ship sunk", () => {
  let ship = Ship(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
