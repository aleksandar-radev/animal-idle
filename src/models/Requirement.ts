import { getRequirementTypes } from '@/utils/generalData';

class Requirement {
  private _name: string;
  private _type: ReturnType<typeof getRequirementTypes>[number];
  private _modifier: number; // the increase per level
  private _innerType: string;
  private _index: number;
  private _value: number;

  static REQUIREMENT_TYPE_LEVEL = 'level';
  static REQUIREMENT_TYPE_CURRENCY = 'currency';
  static REQUIREMENT_TYPE_SKILL = 'skill';
  static REQUIREMENT_TYPE_CHARACTER_UNLOCKED = 'character-unlocked';
  static REQUIREMENT_TYPE_CHARACTER_TYPE = 'character-type';
  static REQUIREMENT_TYPE_UPGRADE = 'upgrade';

  constructor({ name = '', type, innerType = '', index = 0, value = 0, modifier = 0 }) {
    this._name = name;
    this._type = type;
    this._innerType = innerType;
    this._index = index;
    this.value = value;
    this._modifier = modifier;
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
}

export default Requirement;
