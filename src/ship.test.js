import { Ship } from "./ship";

test("ship health", () => {
  let ship = Ship(4);
  expect(ship.getHealth()).toEqual(["O", "O", "O", "O"]);
});

test("ship health and hit", () => {
  let ship = Ship(3);
  expect(ship.getHealth()).toEqual(["O", "O", "O"]);
  ship.hit(1);
  expect(ship.getHealth()).toEqual(["O", "X", "O"]);
});

test("ship suck", () => {
  let ship = Ship(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit(1);
  ship.hit(0);
  expect(ship.isSunk()).toBe(true);
});
