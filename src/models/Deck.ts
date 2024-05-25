import { getAllCharacterTypes } from './../helpers/gameFunctions';

class Deck {
  name: string;
  index: number;
  characters: { [key: number]: { characterType: string, index: number } };

  constructor({
    name = '',
    index = -1,
    characters = {},
  }) {
    this.name = name;
    this.index = index;
    this.characters = characters;
  }

  getAllCharacterTypes(): string[] {
    return Object.keys(this.characters);
  }
}

export default Deck;
