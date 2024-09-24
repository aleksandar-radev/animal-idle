import { getCharacterStats } from '@/utils/game/characterData';
import Requirement from './Requirement';
import Skill from './Skill';

class Character {
  private _name: string;
  private _type: string;
  private _level: number;
  private _currentExperience: number;
  private _totalExperience: number;
  private _health: number;
  private _mana: number;
  private _damage: number;
  private _attackSpeed: number;
  private _critChance: number;
  private _critDamage: number;
  private _doubleDamageChance: number;
  private _isUnlocked: boolean;
  private _requirements: Requirement[];
  private _skills: { [key: string]: Skill };

  static CHARACTER_TYPE_BARBARIAN = 'barbarian';
  static CHARACTER_TYPE_SORCERESS = 'sorceress';
  static CHARACTER_TYPE_DRUID = 'druid';

  static CHARACTER_DISPLAY_PROPS = [
    'name',
    'level',
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
    currentExperience = 0,
    totalExperience = 0,
    isUnlocked = false,
    skills = {},
    requirements = [],
  }) {
    const stats = getCharacterStats()[type];
    this._name = name;
    this._type = type;
    this.level = level;
    this.currentExperience = currentExperience;
    this.totalExperience = totalExperience;
    this._health = stats.health;
    this._mana = stats.mana;
    this._damage = stats.damage;
    this._attackSpeed = stats.attackSpeed;
    this._critChance = stats.critChance;
    this._critDamage = stats.critDamage;
    this._doubleDamageChance = stats.doubleDamageChance;
    this.isUnlocked = isUnlocked;
    this.skills = skills;
    this.requirements = requirements;
  }

  // Getters and Setters
  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get currentExperience(): number {
    return this._currentExperience;
  }

  set currentExperience(value: number) {
    this._currentExperience = value;
  }

  get totalExperience(): number {
    return this._totalExperience;
  }

  set totalExperience(value: number) {
    this._totalExperience = value;
  }

  get health(): number {
    return this._health;
  }

  get mana(): number {
    return this._mana;
  }

  get damage(): number {
    return this._damage;
  }

  get attackSpeed(): number {
    return this._attackSpeed;
  }

  get critChance(): number {
    return this._critChance;
  }

  get critDamage(): number {
    return this._critDamage;
  }

  get doubleDamageChance(): number {
    return this._doubleDamageChance;
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
    Object.entries(value).forEach(([skillType, skillData]) => {
      newSkills[skillType] = new Skill(skillData);
    });
    this._skills = newSkills;
  }

  get requirements(): Requirement[] {
    return this._requirements;
  }

  set requirements(value: any) {
    const { requirements } = getCharacterStats()[this.type];
    const newRequirements = [];
    requirements.forEach((requirementData) => {
      newRequirements.push(requirementData); // TODO fix
    });
    this._requirements = newRequirements;
  }
}

export default Character;
