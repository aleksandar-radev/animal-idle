class Currency {
  private _name: string;
  private _index: number;
  private _value: number;

  static CURRENCY_GOLD = 'gold';
  static CURRENCY_CRYSTAL = 'crystal';

  constructor({ name = '', index = -1, value = 0 }) {
    this.name = name;
    this.index = index;
    this.value = value;
  }

  // Getters and Setters
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
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

export default Currency;
