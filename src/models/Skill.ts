import { getSkillStats } from '../helpers/gameFunctions';
import Requirement from './Requirement';

class Skill {
  private _name: string;
  private _type: string;
  private _category: string;
  private _index: number;
  private _level: number;
  private _manaCost?: number;
  private _passive: boolean;
  private _icon: any;
  private _requirements: Requirement[];
  private _cooldown?: number;

  static SKILL_CATEGORY_ATTACK = 'attack';
  static SKILL_CATEGORY_DEFENSE = 'defense';
  static SKILL_CATEGORY_UTILITY = 'utility';

  static SKILL_TYPE_DAMAGE_FLAT = 'damageFlat';
  static SKILL_TYPE_DAMAGE_PERCENT = 'damagePercent';
  static SKILL_TYPE_CRIT_CHANCE = 'critChance';
  static SKILL_TYPE_CRIT_DAMAGE = 'critDamage';
  static SKILL_TYPE_ATTACK_SPEED = 'attackSpeed';
  static SKILL_TYPE_DOUBLE_DAMAGE_CHANCE = 'doubleDamageChance';
  static SKILL_TYPE_BONUS_HEALTH = 'bonusHealth';
  static SKILL_TYPE_BONUS_DEFENSE = 'bonusDefense';
  static SKILL_TYPE_BONUS_GOLD = 'bonusGold';

  // Barbarian Specific Skills
  static SKILL_TYPE_RAGE = 'rage';

  constructor({ name, type, category, index, level = 0, passive = true, icon = '', requirements = [] }) {
    const stats = getSkillStats()[type];
    console.log('asdf');

    this._name = name;
    this._type = type;
    this._category = category;
    this.index = index;
    this.level = level;
    this._passive = stats.passive;
    this._icon = icon;
    this.requirements = requirements;
    if (!stats.passive) {
      this._manaCost = stats.manaCost;
      this._cooldown = stats.cooldown;
    }
  }

  // Getters and Setters
  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get category(): string {
    return this._category;
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

  get passive(): boolean {
    return this._passive;
  }

  get icon(): any {
    return this._icon;
  }

  get requirements(): Requirement[] {
    return this._requirements;
  }

  set requirements(value: any) {
    const { requirements } = getSkillStats()[this.type];
    const newRequirements = [];
    console.log(requirements);
    requirements.forEach((requirementData) => {
      newRequirements.push(requirementData); // TODO fix
    });
    this._requirements = newRequirements;
  }

  get cooldown(): number {
    return this._cooldown;
  }
}

export default Skill;
