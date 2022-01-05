const Ship = (squares) => {
  const health = squares;

  let damage = 0;

  // for (let i = 0; i < squares; i++) {
  //   health.push("O");
  // }

  const getHealth = () => {
    return health;
  };

  const hit = () => {
    damage++;
  };

  const isSunk = () => {
    return damage >= health;
  };

  return { getHealth, hit, isSunk };
};

export { Ship };
