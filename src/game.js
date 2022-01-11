import { Player } from "./player";
import { Ship } from "./ship";

function populateGrids() {
  let leftGrid = document.getElementById("board-left");
  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.classList.add("board-cell");
    cell.id = `left-cell-${i}`;

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
  //console.log(attacks);
  for (let i = 0; i < 100; i++) {
    let cell = document.getElementById(`left-cell-${i}`);
    let y = Math.floor(i / 10);
    let x = i % 10;

    if (gameboard.getBoard()[x][y] === "X") {
      cell.innerText = "X";
    } else if (typeof gameboard.getBoard()[x][y] === "object") {
      if (gameboard.getBoard()[x][y].isSunk()) {
        cell.innerText = "S";
      } else if (
        attacks.some((attack) => {
          return attack.x === x && attack.y === y;
        })
      ) {
        cell.innerText = "H";
      } else {
        cell.innerText = "O";
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
        cell.innerText = "S";
      } else if (
        attacks.some((attack) => {
          return attack.x === x && attack.y === y;
        })
      ) {
        cell.innerText = "H";
      } else {
        cell.innerText = "O";
      }
    }
  }
}

function randomPlacement(player, p2) {
  let ships = createShips();
  //console.log(ships);
  //console.log(player.getBoard().getBoard());

  let testShip = Ship(3);
  let playerGameboard = player.getBoard();

  while (ships.length > 0) {
    let ship = ships[0];
    //console.log(ships);
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let isHorizontal = Math.random() > 0.5;
    let direction = isHorizontal ? "horizontal" : "vertical";
    try {
      playerGameboard.addShip(x, y, direction, ship);
      ships.shift();
      console.log("placed!");
    } catch (err) {
      console.log(err);
    }
  }
  //playerGameboard.addShip(3, 5, "horizontal", testShip);
  if (player.isPC()) {
    drawPCBoard(p2, player);
  } else {
    drawPlayerBoard(player, p2);
  }
}

function createShips() {
  let ships = [];
  ships.push(Ship(2));
  ships.push(Ship(3));
  ships.push(Ship(3));
  ships.push(Ship(4));
  ships.push(Ship(5));

  return ships;
}

function addListeners(p1, pc) {
  let pcCells = document.getElementsByClassName("pc-cell");
  for (let i = 0; i < pcCells.length; i++) {
    pcCells[i].addEventListener("click", () => {
      if (pcCells[i].classList.contains("active")) {
        let y = Math.floor(i / 10);
        let x = i % 10;
        console.log(`x:${x}, y:${y}`);
        let atk = pc.attack(x, y);
        pc.getBoard().receiveAttack(atk.x, atk.y);
        drawPCBoard(p1, pc);
        pcTurn(p1, pc);
      }
    });
  }
}

function startGame() {
  let p1 = Player(false);
  let pc = Player(true);

  randomPlacement(p1, pc);
  randomPlacement(pc, p1);

  addListeners(p1, pc);

  playerTurn();

  // console.log("TEST");
  // console.log(pc.getBoard().getBoard());
  // console.log("TEST2");
  // console.log(p1.getBoard().getBoard());
}

function playerTurn() {
  togglePlayerTargetting();
}

function pcTurn(p1, pc) {
  togglePlayerTargetting();
  let attack = p1.attackAI();
  p1.getBoard().receiveAttack(attack.x, attack.y);
  drawPlayerBoard(p1, pc);
  playerTurn();
}

function togglePlayerTargetting() {
  let pcCells = document.getElementsByClassName("pc-cell");
  for (let i = 0; i < pcCells.length; i++) {
    pcCells[i].classList.toggle("active");
  }
}

function mainGameLoop() {
  let gameOver = false;
  let isPlayerTurn = true;
}

export { populateGrids, startGame };
