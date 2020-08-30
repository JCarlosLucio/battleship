const Player = () => {
  // Attacks enemyBoard at coords [y][x];
  const attack = (y, x, enemyBoard) => enemyBoard.receiveAttack(y, x);

  return { attack };
};

export default Player;
