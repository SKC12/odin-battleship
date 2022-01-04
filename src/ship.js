const Ship = (squares) => {
  const health = [];

  for (let i = 0; i < squares; i++) {
    health.push("O");
  }

  const getHealth = () => {
    return health;
  };

  const hit = (target) => {
    health[target] = "X";
  };

  const isSunk = () => {
    for (let i = 0; i < squares; i++) {
      if (health[i] === "O") {
        return false;
      }
    }
    return true;
  };

  return { getHealth, hit, isSunk };
};

export { Ship };
