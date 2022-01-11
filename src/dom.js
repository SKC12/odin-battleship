import { Player } from "./player";
import { Ship } from "./ship";
import { pcTurn, playerTurn, createShips } from "./game";

function populateGrids() {
  let leftGrid = document.getElementById("board-left");
  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.classList.add("board-cell");
    cell.classList.add("player-cell");
    cell.id = `${i}`;

    leftGrid.appendChild(cell);
  }

  let rightGrid = document.getElementById("board-right");

  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.classList.add("board-cell");
    cell.classList.add("pc-cell");
    cell.id = `right-cell-${i}`;

    rightGrid.appendChild(cell);
  }
}

function drawPlayerBoard(p1, pc) {
  let gameboard = p1.getBoard();
  let attacks = p1.getSentAttack();
  for (let i = 0; i < 100; i++) {
    let cell = document.getElementById(`${i}`);
    let y = Math.floor(i / 10);
    let x = i % 10;

    if (gameboard.getBoard()[x][y] === "X") {
      cell.innerText = "X";
    } else if (typeof gameboard.getBoard()[x][y] === "object") {
      if (gameboard.getBoard()[x][y].isSunk()) {
        //cell.innerText = "S";
        cell.style.backgroundColor = "red";
      } else if (
        attacks.some((attack) => {
          return attack.x === x && attack.y === y;
        })
      ) {
        //cell.innerText = "H";
        cell.style.backgroundColor = "pink";
      } else {
        //cell.innerText = "O";
        cell.style.backgroundColor = "blue";
      }
    }
  }
}

function drawPCBoard(p1, pc) {
  let gameboard = pc.getBoard();
  let attacks = pc.getSentAttack();
  //console.log(attacks);

  for (let i = 0; i < 100; i++) {
    let cell = document.getElementById(`right-cell-${i}`);
    let y = Math.floor(i / 10);
    let x = i % 10;
    //console.log(`x:${x}, y:${y}`);
    if (gameboard.getBoard()[x][y] === "X") {
      cell.innerText = "X";
    } else if (typeof gameboard.getBoard()[x][y] === "object") {
      if (gameboard.getBoard()[x][y].isSunk()) {
        //cell.innerText = "S";
        cell.style.backgroundColor = "red";
      } else if (
        attacks.some((attack) => {
          return attack.x === x && attack.y === y;
        })
      ) {
        //cell.innerText = "H";
        cell.style.backgroundColor = "pink";
      } else {
        //cell.innerText = "O";
      }
    }
  }
}

function addPCListeners(p1, pc) {
  let pcCells = document.getElementsByClassName("pc-cell");
  for (let i = 0; i < pcCells.length; i++) {
    pcCells[i].addEventListener("click", () => {
      if (pcCells[i].classList.contains("active")) {
        let y = Math.floor(i / 10);
        let x = i % 10;
        //console.log(`x:${x}, y:${y}`);
        let atk = pc.attack(x, y);
        pc.getBoard().receiveAttack(atk.x, atk.y);
        drawPCBoard(p1, pc);
        if (!pc.getBoard().allSunk()) {
          pcTurn(p1, pc);
        } else {
          //console.log("WIN");
          togglePlayerTargetting();
          document.getElementById("announcer").innerText = "You Won!";
        }
      }
    });
  }
}

let placeShipOnMouseDown = (e, p1, ships) => {
  let id = e.target.id;
  let y = Math.floor(id / 10);
  let x = id % 10;
  let gameboard = p1.getBoard();
  let direction = "";
  let announcer = document.getElementById("announcer");
  if (e.which === 1) {
    direction = "horizontal";
  } else if (e.which === 3) {
    direction = "vertical";
  }
  if (ships.length > 0) {
    try {
      gameboard.addShip(x, y, direction, ships[0]);
      ships.shift();

      if (ships.length === 0) {
        announcer.innerText = `Time to shoot! Click on your opponents board to attempt a hit!`;
        playerTurn();
      } else {
        announcer.innerText = `Your next ship has size ${ships[0].getHealth()}`;
      }
    } catch (err) {
      console.log(err);
    }
  }

  drawPlayerBoard(p1);
};

function togglePlayerTargetting() {
  let pcCells = document.getElementsByClassName("pc-cell");
  for (let i = 0; i < pcCells.length; i++) {
    pcCells[i].classList.toggle("active");
  }
}

function addPlayerListeners(p1) {
  let pcCells = document.getElementsByClassName("player-cell");
  let ships = createShips();
  for (let i = 0; i < pcCells.length; i++) {
    pcCells[i].addEventListener("mousedown", (e) =>
      placeShipOnMouseDown(e, p1, ships)
    );
  }
}

export {
  populateGrids,
  drawPlayerBoard,
  drawPCBoard,
  addPCListeners,
  placeShipOnMouseDown,
  togglePlayerTargetting,
  addPlayerListeners,
};
