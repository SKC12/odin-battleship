import { Player } from "./player";
import { Ship } from "./ship";
import {
  populateGrids,
  drawPlayerBoard,
  drawPCBoard,
  addPCListeners,
  placeShipOnMouseDown,
  togglePlayerTargetting,
  addPlayerListeners,
} from "./dom";

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
      // console.log("placed!");
    } catch (err) {
      // console.log(err);
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

function startGame() {
  let p1 = Player(false);
  let pc = Player(true);

  //randomPlacement(p1, pc);
  randomPlacement(pc, p1);

  addPCListeners(p1, pc);

  addPlayerListeners(p1);
}

function playerTurn() {
  togglePlayerTargetting();
}

function pcTurn(p1, pc) {
  togglePlayerTargetting();
  let attack = p1.attackAI();
  p1.getBoard().receiveAttack(attack.x, attack.y);
  drawPlayerBoard(p1, pc);
  if (!p1.getBoard().allSunk()) {
    playerTurn();
  } else {
    document.getElementById("announcer").innerText = "You Lost!";
  }
}

export { populateGrids, startGame, pcTurn, playerTurn, createShips };
