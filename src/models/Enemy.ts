class Enemy {
  private _name: string;
  private _type: string;
  private _health: number;
  private _damage: number;
  private _attackSpeed: number;
  private _mana: number;
  private _experienceReward: number;

  static ENEMY_TYPE_BARBARIAN = 'barbarian';
  static ENEMY_TYPE_SORCERESS = 'sorceress';
  static ENEMY_TYPE_ASSASSIN = 'assassin';
  static ENEMY_TYPE_WARRIOR = 'warrior';

  constructor({ name, type, health, damage, attackSpeed, mana, experienceReward }) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.damage = damage;
    this.attackSpeed = attackSpeed;
    this.mana = mana;
    this.experienceReward = experienceReward;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    this._health = value;
  }

  get damage(): number {
    return this._damage;
  }

  set damage(value: number) {
    this._damage = value;
  }

  get attackSpeed(): number {
    return this._attackSpeed;
  }

  set attackSpeed(value: number) {
    this._attackSpeed = value;
  }

  get mana(): number {
    return this._mana;
  }

  set mana(value: number) {
    this._mana = value;
  }

  get experienceReward(): number {
    return this._experienceReward;
  }

  set experienceReward(value: number) {
    this._experienceReward = value;
  }
}

export default Enemy;
