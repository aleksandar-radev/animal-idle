import DeckCharacter from './DeckCharacter';

class Deck {
  private _name: string;
  private _index: number;
  private _characters: { [key: string]: DeckCharacter };

  static DEFAULT_DECK_NAME = 'default';

  constructor({ name = '', index = 0, characters = {} }) {
    this.name = name;
    this.index = index;
    this.characters = characters;
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

  get characters(): { [key: string]: DeckCharacter } {
    return this._characters;
  }

  set characters(value: { [key: string]: DeckCharacter }) {
    this._characters = value;
  }
}

export default Deck;
