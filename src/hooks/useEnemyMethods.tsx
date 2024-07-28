import { getAllEnemyStats, getAllEnemyTypes } from '../helpers/gameFunctions';
import Currency from '../models/Currency';
import Enemy from '../models/Enemy';
import useCharacterMethods from './useCharacterMethods';
import useStore from './useStore';

const useEnemyMethods = () => {
  const { data, fightState } = useStore();
  const cm = useCharacterMethods();

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
    reset() {
      fightState.enemy = null;
      fightState.enemyLevel = 1;
    },

    getRandomEnemy(): Enemy {
      const keys = getAllEnemyTypes();
      const randomKey = keys[Math.floor(Math.random() * keys.length)];

      return methods.getEnemyByKey(randomKey);
    },

    getEnemyByKey(key) {
      const stats = getAllEnemyStats()[key];
      return new Enemy({ ...stats });
    },
    getCurrentHealth() {
      return fightState.enemyCurrentHealth;
    },
    getTotalHealth() {
      let health = fightState.enemy.health;
      health += Math.ceil((health * fightState.enemyLevel) / 100);
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
      damage += Math.ceil((damage * fightState.enemyLevel) / 100);
      return damage;
    },
    takeDamage(damage) {
      if (fightState.enemyCurrentHealth - damage <= 0) {
        methods.die();
      } else {
        fightState.enemyCurrentHealth -= damage;
      }
    },
    die() {
      fightState.enemyCurrentHealth = null;
      data.currencies[Currency.CURRENCY_TYPE_GOLD].value += 1;
      fightState.enemy = null;
      fightState.enemyLevel++;

      cm.getCharactersInActiveDeck().forEach((char) => {
        cm.addExperience(char.type, 10);
      });
    },
  };

  return methods;
};

export default useEnemyMethods;
