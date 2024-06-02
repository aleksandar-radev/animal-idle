import Skill from './Skill';

class Character {
  private _name: string;
  private _type: string;
  private _level: number;
  private _experience: number;
  private _health: number;
  private _mana: number;
  private _damage: number;
  private _attackSpeed: number;
  private _critChance: number;
  private _critDamage: number;
  private _doubleDamageChance: number;
  private _isUnlocked: boolean;
  private _skills: { [key: string]: Skill };

  static CHARACTER_TYPE_BARBARIAN = 'barbarian';
  static CHARACTER_TYPE_SORCERESS = 'sorceress';
  static CHARACTER_TYPE_DRUID = 'druid';

  static CHARACTER_DISPLAY_PROPS = [
    'name',
    'level',
    'experience',
    'health',
    'mana',
    'damage',
    'attackSpeed',
    'critChance',
    'critDamage',
    'doubleDamageChance',
  ];

  constructor({
    name,
    type,
    level = 1,
    experience = 1,
    health = 100,
    mana = 50,
    damage = 15,
    attackSpeed = 1000,
    critChance = 0,
    critDamage = 0,
    doubleDamageChance = 0,
    isUnlocked = false,
    skills,
  }) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.experience = experience;
    this.health = health;
    this.mana = mana;
    this.damage = damage;
    this.attackSpeed = attackSpeed;
    this.critChance = critChance;
    this.critDamage = critDamage;
    this.doubleDamageChance = doubleDamageChance;
    this.isUnlocked = isUnlocked;
    this.skills = skills;
  }

  // Getters and Setters
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

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get experience(): number {
    return this._experience;
  }

  set experience(value: number) {
    this._experience = value;
  }

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    this._health = value;
  }

  get mana(): number {
    return this._mana;
  }

  set mana(value: number) {
    this._mana = value;
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

  get critChance(): number {
    return this._critChance;
  }

  set critChance(value: number) {
    this._critChance = value;
  }

  get critDamage(): number {
    return this._critDamage;
  }

  set critDamage(value: number) {
    this._critDamage = value;
  }

  get doubleDamageChance(): number {
    return this._doubleDamageChance;
  }

  set doubleDamageChance(value: number) {
    this._doubleDamageChance = value;
  }

  get isUnlocked(): boolean {
    return this._isUnlocked;
  }

  set isUnlocked(value: boolean) {
    this._isUnlocked = value;
  }

  get skills(): { [key: string]: Skill } {
    return this._skills;
  }

  set skills(value: { [key: string]: Skill }) {
    const newSkills = {};
    Object.entries(value).forEach(([skillName, skillData]) => {
      newSkills[skillName] = new Skill(skillData);
    });
    this._skills = newSkills;
  }
}

export default Character;
