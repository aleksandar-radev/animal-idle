import { getRequirementTypes } from '@/utils/generalData';

// name is a unique identifier for the requirement
// type is the type of requirement
// modifier is the increase per modifierType (e.g. level)
// modifierType prop name of parent model, that holds the requirement (e.g. level of skill). Used to calculate the modifier (e.g. modifier * modifierType.value)
// innerType is the type of the type (e.g. if requirement type currency, innerType would be gold/crystal)
// index is used for sorting
// value is the amount of the requirement (e.g. if requirement type currency, value would be the amount of gold/crystal needed to pass the requirement)

class Requirement {
  private _name: string;
  private _type: ReturnType<typeof getRequirementTypes>[number];
  private _modifier: number;
  private _modifierType: string;
  private _innerType: string;
  private _index: number;
  private _value: number;

  static REQUIREMENT_TYPE_LEVEL = 'level';
  static REQUIREMENT_TYPE_CURRENCY = 'currency';
  static REQUIREMENT_TYPE_SKILL = 'skill';
  static REQUIREMENT_TYPE_CHARACTER_UNLOCKED = 'character-unlocked';
  static REQUIREMENT_TYPE_CHARACTER_TYPE = 'character-type';
  static REQUIREMENT_TYPE_UPGRADE = 'upgrade';

  static REQUIREMENT_MODIFIER_TYPE_LEVEL = 'level';

  constructor({ name = '', type, innerType = '', index = 0, value = 0, modifier = 0, modifierType = '' }) {
    this._name = name;
    this._type = type;
    this._innerType = innerType;
    this._index = index;
    this.value = value;
    this._modifier = modifier;
    this._modifierType = modifierType;
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get innerType(): string {
    return this._innerType;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get modifier(): number {
    return this._modifier;
  }

  set modifier(value: number) {
    this._modifier = value;
  }

  get modifierType(): string {
    return this._modifierType;
  }

  set modifierType(value: string) {
    this._modifierType = value;
  }
}

export default Requirement;
