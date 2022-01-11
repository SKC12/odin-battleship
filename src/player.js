import { Gameboard } from "./gameboard";

const Player = (isAI) => {
  let gameboard = Gameboard();
  const AIstatus = isAI;
  let sentAttacks = [];

  const isPC = () => {
    return AIstatus;
  };

  const getBoard = () => {
    return gameboard;
  };

  const getSentAttack = () => {
    return sentAttacks;
  };

  const attack = (x, y) => {
    let attack = {
      x,
      y,
    };
    sentAttacks.push(attack);
    return attack;
  };

  const attackAI = () => {
    let valid = false;
    let attack;
    while (!valid) {
      attack = {
        x: getRandomInt(0, 9),
        y: getRandomInt(0, 9),
      };
      if (
        !sentAttacks.some((atk) => {
          return atk.x === attack.x && atk.y === attack.y;
        })
      ) {
        valid = true;
      }
    }
    sentAttacks.push(attack);
    return attack;
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    getBoard,
    getSentAttack,
    attack,
    attackAI,
    isPC,
  };
};

export { Player };
