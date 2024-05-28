import { CURRENCY_GOLD } from '../helpers/constants/gameVariables';
import { getAllEnemyStats, getAllEnemyTypes } from '../helpers/gameFunctions';
import Enemy from '../models/Enemy';
import useStore from './useStore';

const useEnemyMethods = () => {
  const { data, fightState } = useStore();

  const methods = {
    getCurrentEnemy() {
      return fightState.enemy;
    },
    setCurrentEnemy(enemy: Enemy) {
      fightState.enemy = enemy;
      fightState.enemyCurrentHealth = methods.getTotalHealth();
      fightState.enemyTotalHealth = methods.getTotalHealth();
      fightState.enemyCurrentMana = methods.getTotalMana();
      fightState.enemyTotalMana = methods.getTotalMana();

      return fightState.enemy;
    },
    getCurrentEnemyName() {
      return fightState.enemy.name;
    },
    getLevel() {
      return fightState.enemy.level;
    },
    reset() {
      fightState.enemy = null;
    },

    getRandomEnemy(): Enemy {
      const keys = getAllEnemyTypes();
      const randomKey = keys[Math.floor(Math.random() * keys.length)];

      return this.getEnemyByKey(randomKey);
    },

    getEnemyByKey(key) {
      const stats = getAllEnemyStats()[key];
      return new Enemy({ ...stats, level: 1 });
    },
    getCurrentHealth() {
      return fightState.enemyCurrentHealth;
    },
    getTotalHealth() {
      let health = fightState.enemy.health;
      health += Math.ceil((health * fightState.enemy.level) / 100);
      return health;
    },
    getCurrentMana() {
      if (!fightState.enemyCurrentMana) {
        fightState.enemyCurrentMana = methods.getTotalMana();
      }
      return fightState.enemyCurrentMana;
    },
    getTotalMana() {
      let mana = fightState.enemyTotalMana;
      return mana;
    },
    getTotalDamage() {
      let damage = fightState.enemy.damage;
      damage += Math.ceil((damage * fightState.enemy.level) / 100);
      return damage;
    },
    takeDamage(damage) {
      if (fightState.enemyCurrentHealth - damage <= 0) {
        this.die();
      } else {
        fightState.enemyCurrentHealth -= damage;
      }
    },
    die() {
      fightState.enemyCurrentHealth = null;
      data.currencies[CURRENCY_GOLD].value += 1;
      fightState.enemy.level++;
      fightState.enemy = null;
    },
  };

  return methods;
};

export default useEnemyMethods;
