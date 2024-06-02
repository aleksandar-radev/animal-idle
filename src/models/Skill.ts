class Skill {
  private _name: string;
  private _type: string;
  private _index: number;
  private _level: number;
  private _manaCost: number;
  private _passive: boolean;
  private _icon: any;
  private _requirements: any;
  private _cost: any;

  static SKILL_TYPE_ATTACK = 'attack';
  static SKILL_TYPE_DEFENSE = 'defense';
  static SKILL_TYPE_UTILITY = 'utility';
  static SKILL_DAMAGE_FLAT = 'damageFlat';
  static SKILL_DAMAGE_PERCENT = 'damagePercent';
  static SKILL_CRIT_CHANCE = 'critChance';
  static SKILL_CRIT_DAMAGE = 'critDamage';
  static SKILL_ATTACK_SPEED = 'attackSpeed';
  static SKILL_DOUBLE_DAMAGE_CHANCE = 'doubleDamageChance';
  static SKILL_BONUS_HEALTH = 'bonusHealth';
  static SKILL_BONUS_DEFENSE = 'bonusDefense';
  static SKILL_BONUS_GOLD = 'bonusGold';

  constructor({ name, type, index, level, manaCost = 0, passive = true, icon = '', requirements = {}, cost = {} }) {
    this.name = name;
    this.type = type;
    this.index = index;
    this.level = level;
    this.manaCost = manaCost;
    this.passive = passive;
    this.icon = icon;
    this.requirements = requirements;
    this.cost = cost;
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

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get manaCost(): number {
    return this._manaCost;
  }

  set manaCost(value: number) {
    this._manaCost = value;
  }

  get passive(): boolean {
    return this._passive;
  }

  set passive(value: boolean) {
    this._passive = value;
  }

  get icon(): any {
    return this._icon;
  }

  set icon(value: any) {
    this._icon = value;
  }

  get requirements(): any {
    return this._requirements;
  }

  set requirements(value: any) {
    this._requirements = value;
  }

  get cost(): any {
    return this._cost;
  }

  set cost(value: any) {
    this._cost = value;
  }
}

export default Skill;
