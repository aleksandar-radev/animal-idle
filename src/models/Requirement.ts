class Requirement {
  private _name: string;
  private _type: string;
  private _index: number;
  private _value: number;

  constructor({ name = '', type, index = -1, value = 0 }) {
    this.name = name;
    this.type = type;
    this.index = index;
    this.value = value;
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
}

export default Requirement;
