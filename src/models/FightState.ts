import Enemy from './Enemy';

class FightState {
  characterCurrentHealth: number;
  characterCurrentMana: number;
  characterTotalHealth: number;
  characterTotalMana: number;
  isAlive: boolean;

  enemy: Enemy;

  enemyCurrentHealth: number;
  enemyCurrentMana: number;
  enemyTotalHealth: number;
  enemyTotalMana: number;

  constructor({
    characterCurrentHealth = 0,
    characterCurrentMana = 0,
    characterTotalHealth = 0,
    characterTotalMana = 0,
    isAlive = true,

    enemy = null,

    enemyCurrentHealth = 0,
    enemyCurrentMana = 0,
    enemyTotalHealth = 0,
    enemyTotalMana = 0,
  }) {
    this.characterCurrentHealth = characterCurrentHealth;
    this.characterCurrentMana = characterCurrentMana;
    this.characterTotalHealth = characterTotalHealth;
    this.characterTotalMana = characterTotalMana;
    this.isAlive = isAlive;

    this.enemy = enemy;

    this.enemyCurrentHealth = enemyCurrentHealth;
    this.enemyCurrentMana = enemyCurrentMana;
    this.enemyTotalHealth = enemyTotalHealth;
    this.enemyTotalMana = enemyTotalMana;
  }
}

export default FightState;
