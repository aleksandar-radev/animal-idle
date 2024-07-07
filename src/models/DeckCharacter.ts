class DeckCharacter {
  private _type: string;
  private _index: number;

  constructor({ type = '', index = 0 }) {
    this.type = type;
    this.index = index;
  }

  // Getters and Setters
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
}

export default DeckCharacter;
