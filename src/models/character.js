const character = {
  currentHealth: 100,
  totalHealth: 100,
  currentMana: 100,
  totalMana: 100,
  damage: 5,
  takeDamage (damage) {
    this.currentHealth -= damage;
  },
}

export default character;