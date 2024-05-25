
class Currency {
  name: string;
  index: number;
  characterTypes: string[];

  constructor({
    name = '',
    index = -1,
    characterTypes = [],
  }) {
    this.name = name;
    this.index = index;
    this.characterTypes = characterTypes;
  }
}

export default Currency;
