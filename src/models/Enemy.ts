import {
  CURRENCY_GOLD
} from '../helpers/constants/gameVariables';
import { getAllEnemyStats, getAllEnemyTypes } from '../helpers/gameFunctions';

class Enemy {
  current: any;
  renderChanges: number;
  enemyTypes: any;

  constructor({
    current = null,
  }) {
    this.current = current;
    this.renderChanges = 0;
  }

  renderChange() {
    this.renderChanges++;
    if (this.renderChanges > 1e99) {
      this.renderChanges = 0;
    }
  }

  reset() {
    this.current = null;
  }

  getRandomEnemy() {
    const keys = getAllEnemyTypes();
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    return this.getEnemyByKey(randomKey);
  }

  getEnemyByKey(key) {
    return {
      // ...this.enemyMethods(),
      ...getAllEnemyStats()[key],
    };
  }

  //TODO  move to hook
  // enemyMethods() {
  //   return {
  //     getCurrentHealth() {
  //       if (!this.currentHealth) {
  //         this.currentHealth = this.getTotalHealth();
  //       }
  //       return this.currentHealth;
  //     },
  //     getTotalHealth() {
  //       let health = this.totalHealth;
  //       health += Math.ceil((health * store.data.enemy.level) / 100);
  //       return health;
  //     },
  //     getTotalDamage() {
  //       let damage = this.damage;
  //       damage += Math.ceil((damage * store.data.enemy.level) / 100);
  //       return damage;
  //     },
  //     takeDamage(damage) {
  //       if (this.currentHealth - damage <= 0) {
  //         this.die();
  //       } else {
  //         this.currentHealth -= damage;
  //       }
  //       store.enemy.renderChange();
  //     },
  //     die() {
  //       this.currentHealth = null;
  //       store.data.currencies[CURRENCY_GOLD].value += 1;
  //       store.data.enemy.level++;
  //       store.enemy.current = null;
  //     },
  //   };
  // }
}

export default Enemy;
