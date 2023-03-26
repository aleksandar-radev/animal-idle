import { ENEMY_TYPE_BERSERKER, ENEMY_TYPE_SORCERESS } from '../constants/gameVariables';

// eslint-disable-next-line no-unused-vars
const Enemy = (store) => {
  return {
    renderChanges: 0,
    current: null,
    renderChange() {
      this.renderChanges++;
      if (this.renderChanges > 1e99) {
        this.renderChanges = 0;
      }
    },
    resetEnemy() {
      this.current = null;
    },
    getRandomEnemy() {
      const keys = Object.keys(this.enemyTypes);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];

      return this.getEnemyByKey(randomKey);
    },
    getEnemyByKey(key) {
      return {
        ...this.enemyMethods(),
        ...this.enemyTypes[key],
      };
    },
    enemyMethods() {
      return {
        takeDamage(amount) {
          if (this.currentHealth - amount <= 0) {
            this.currentHealth = 0;
            store.character.currencies['asd'];
            store.enemy.current = store.enemy.getRandomEnemy();
          } else {
            this.currentHealth -= amount;
          }
          store.enemy.renderChange();
        },
      };
    },
    enemyTypes: {
      [ENEMY_TYPE_BERSERKER]: {
        name: ENEMY_TYPE_BERSERKER,
        currentHealth: 100,
        totalHealth: 100,
        damage: 5,
        atackSpeed: 3000,
      },
      [ENEMY_TYPE_SORCERESS]: {
        name: ENEMY_TYPE_SORCERESS,
        currentHealth: 60,
        totalHealth: 60,
        damage: 32,
        atackSpeed: 4000,
      },
    },
  };
};

export default Enemy;
