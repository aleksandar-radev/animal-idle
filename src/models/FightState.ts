import Enemy from './Enemy';

class FightState {
  private _characterCurrentHealth: number;
  private _characterCurrentMana: number;
  private _characterTotalHealth: number;
  private _characterTotalMana: number;
  private _isAlive: boolean;

  private _enemy: Enemy;
  private _enemyLevel: number;

  private _enemyCurrentHealth: number;
  private _enemyCurrentMana: number;
  private _enemyTotalHealth: number;
  private _enemyTotalMana: number;

  constructor({
    characterCurrentHealth = 0,
    characterCurrentMana = 0,
    characterTotalHealth = 0,
    characterTotalMana = 0,
    isAlive = true,

    enemy = null,
    enemyLevel = 1,

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
    this.enemyLevel = enemyLevel;

    this.enemyCurrentHealth = enemyCurrentHealth;
    this.enemyCurrentMana = enemyCurrentMana;
    this.enemyTotalHealth = enemyTotalHealth;
    this.enemyTotalMana = enemyTotalMana;
  }

  // Getters and Setters
  get characterCurrentHealth(): number {
    return this._characterCurrentHealth;
  }

  set characterCurrentHealth(value: number) {
    this._characterCurrentHealth = value;
  }

  get characterCurrentMana(): number {
    return this._characterCurrentMana;
  }

  set characterCurrentMana(value: number) {
    this._characterCurrentMana = value;
  }

  get characterTotalHealth(): number {
    return this._characterTotalHealth;
  }

  set characterTotalHealth(value: number) {
    this._characterTotalHealth = value;
  }

  get characterTotalMana(): number {
    return this._characterTotalMana;
  }

  set characterTotalMana(value: number) {
    this._characterTotalMana = value;
  }

  get isAlive(): boolean {
    return this._isAlive;
  }

  set isAlive(value: boolean) {
    this._isAlive = value;
  }

  get enemy(): Enemy {
    return this._enemy;
  }

  set enemy(value: Enemy) {
    this._enemy = value;
  }

  get enemyLevel(): number {
    return this._enemyLevel;
  }

  set enemyLevel(value: number) {
    this._enemyLevel = value;
  }

  get enemyCurrentHealth(): number {
    return this._enemyCurrentHealth;
  }

  set enemyCurrentHealth(value: number) {
    this._enemyCurrentHealth = value;
  }

  get enemyCurrentMana(): number {
    return this._enemyCurrentMana;
  }

  set enemyCurrentMana(value: number) {
    this._enemyCurrentMana = value;
  }

  get enemyTotalHealth(): number {
    return this._enemyTotalHealth;
  }

  set enemyTotalHealth(value: number) {
    this._enemyTotalHealth = value;
  }

  get enemyTotalMana(): number {
    return this._enemyTotalMana;
  }

  set enemyTotalMana(value: number) {
    this._enemyTotalMana = value;
  }
}

export default FightState;
