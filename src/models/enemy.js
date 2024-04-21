import {
  CURRENCY_GOLD,
  ENEMY_TYPE_BARBARIAN,
  ENEMY_TYPE_SORCERESS,
  ENEMY_TYPE_ASSASSIN,
  ENEMY_TYPE_WARRIOR,
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
        getTotalDamage() {
          let damage = this.damage;
          damage += Math.ceil((damage * store.data.enemy.level) / 100);
          return damage;
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
          store.data.currencies[CURRENCY_GOLD].value += 1;
          store.data.enemy.level++;
          store.enemy.current = null;
        },
      };
    },

    enemyTypes: {
      [ENEMY_TYPE_BARBARIAN]: {
        name: ENEMY_TYPE_BARBARIAN,
        currentHealth: null,
        totalHealth: 100,
        damage: 5,
        attackSpeed: 3000,
      },
      [ENEMY_TYPE_SORCERESS]: {
        name: ENEMY_TYPE_SORCERESS,
        currentHealth: null,
        totalHealth: 60,
        damage: 20,
        attackSpeed: 4000,
      },
      [ENEMY_TYPE_ASSASSIN]: {
        name: ENEMY_TYPE_ASSASSIN,
        currentHealth: null,
        totalHealth: 80,
        damage: 10,
        attackSpeed: 2000,
      },
      [ENEMY_TYPE_WARRIOR]: {
        name: ENEMY_TYPE_WARRIOR,
        currentHealth: null,
        totalHealth: 150,
        damage: 5,
        attackSpeed: 4000,
      },
    },
  };
};

export default Enemy;
