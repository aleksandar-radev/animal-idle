const enemy = {
  currentHealth: 100,
  totalHealth: 100,
  damage: 5,
  takeDamage (damage) {
    this.currentHealth -= damage;
  },
}

export default enemy;