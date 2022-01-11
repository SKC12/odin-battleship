import { Ship } from "./ship";

const Gameboard = () => {
  let board = [
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ];

  const getBoard = () => {
    return board;
  };

  const addShip = (x, y, direction, ship) => {
    let length = ship.getHealth();
    if (validPlacement(x, y, length, direction)) {
      for (let i = 0; i < length; i++) {
        if (direction === "horizontal") {
          board[x + i][y] = ship;
        } else if (direction === "vertical") {
          board[x][y + i] = ship;
        }
      }
    } else {
      throw "Invalid Placement";
    }
  };

  function validPlacement(x, y, length, direction) {
    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        if (x + length >= 10) {
          return false;
        }
        if (board[x + i][y] !== ".") {
          return false;
        }
      }
      return true;
    } else {
      for (let i = 0; i < length; i++) {
        if (y + length >= 10) {
          return false;
        }
        if (board[x][y + i] !== ".") {
          return false;
        }
      }
      return true;
    }
  }

  function receiveAttack(x, y) {
    let target = board[x][y];
    if (target === ".") {
      board[x][y] = "X";
    } else if (typeof target === "object") {
      target.hit();
    }
  }

  function allSunk() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        let check = board[i][j];
        if (typeof check === "object") {
          if (!check.isSunk()) return false;
        }
      }
    }
    return true;
  }

  return { getBoard, addShip, receiveAttack, allSunk };
};

export { Gameboard };
