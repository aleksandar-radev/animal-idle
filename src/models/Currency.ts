class Currency {
  name: string;
  index: number;
  characterTypes: string[];
  value: number;

  constructor({ name = '', index = -1, characterTypes = [], value = 0 }) {
    this.name = name;
    this.index = index;
    this.characterTypes = characterTypes;
    this.value = value;
  }
}

export default Currency;
