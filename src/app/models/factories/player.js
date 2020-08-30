const Player = () => {
  // Attacks enemyBoard at coords [y][x];
  const attack = (y, x, enemyBoard) => enemyBoard.receiveAttack(y, x);

  const autoAttack = (enemyBoard) => {
    const rand = () => Math.floor(Math.random() * 10);
    const y = rand();
    const x = rand();
    const cell = enemyBoard.getBoard()[y][x];
    if (cell === 'miss' || cell === 'hit') {
      // tries again until it valid cell is picked
      autoAttack(enemyBoard);
    } else {
      // attacks a valid cell
      enemyBoard.receiveAttack(y, x);
    }
  };

  return { attack, autoAttack };
};

export default Player;
