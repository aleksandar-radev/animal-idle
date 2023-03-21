const enemy = {
  currentHealth: 100,
  totalHealth: 100,
  takeDamage (damage) {
    console.log(this.currentHealth);
    this.currentHealth -= damage;
  },
}

export default enemy;