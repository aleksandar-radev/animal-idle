
// eslint-disable-next-line no-unused-vars
const Enemy = (store) => {

  return {
    currentHealth: 100,
    totalHealth: 100,
    damage: 5,

    takeDamage (amount) {
      this.currentHealth -= amount;
    },
    reset () {
      this.currentHealth = this.totalHealth;
    }
  };
};

export default Enemy;
