import {
  CHARACTER_CURRENCY_GOLD,
  ENEMY_TYPE_BERSERKER,
  ENEMY_TYPE_SORCERESS,
} from '../constants/gameVariables';

// eslint-disable-next-line no-unused-vars
const Enemy = (store) => {
  return {
    current: null,

    renderChanges: 0,
    renderChange() {
      this.renderChanges++;
      if (this.renderChanges > 1e99) {
        this.renderChanges = 0;
      }
    },

    reset() {
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
        getCurrentHealth() {
          if (!this.currentHealth) {
            this.currentHealth = this.getTotalHealth();
          }
          return this.currentHealth;
        },
        getTotalHealth() {
          let health = this.totalHealth;
          health += Math.ceil((health * store.data.enemy.level) / 100);
          return health;
        },
        takeDamage(damage) {
          if (this.currentHealth - damage <= 0) {
            this.die();
          } else {
            this.currentHealth -= damage;
          }
          store.enemy.renderChange();
        },
        die() {
          this.currentHealth = null;
          store.data.currencies[CHARACTER_CURRENCY_GOLD].add(1);
          store.data.enemy.level++;
          store.enemy.current = store.enemy.getRandomEnemy();
        },
      };
    },

    enemyTypes: {
      [ENEMY_TYPE_BERSERKER]: {
        name: ENEMY_TYPE_BERSERKER,
        currentHealth: null,
        totalHealth: 100,
        damage: 5,
        atackSpeed: 3000,
      },
      [ENEMY_TYPE_SORCERESS]: {
        name: ENEMY_TYPE_SORCERESS,
        currentHealth: null,
        totalHealth: 60,
        damage: 15,
        atackSpeed: 4000,
      },
    },
  };
};

export default Enemy;
