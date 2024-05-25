class GameState {
  currentHealth: number;
  currentMana: number;

  constructor({
    currentHealth = 0,
    currentMana = 0,
  }) {
    this.currentHealth = currentHealth;
    this.currentMana = currentMana;
  }
}

export default GameState;
