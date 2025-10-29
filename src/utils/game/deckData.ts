import Character from '@/models/Character';
import Deck from '@/models/Deck';
import DeckCharacter from '@/models/DeckCharacter';

export const defaultDeckData = {
  '0': new Deck({
    name: 'Starter Squad',
    index: 0,
    characters: {
      [Character.CHARACTER_TYPE_BARBARIAN]: new DeckCharacter({
        type: Character.CHARACTER_TYPE_BARBARIAN,
        index: 0,
      }),
      [Character.CHARACTER_TYPE_WARRIOR]: new DeckCharacter({
        type: Character.CHARACTER_TYPE_WARRIOR,
        index: 1,
      }),
    },
  }),
  '1': new Deck({
    name: 'Mystic Circle',
    index: 1,
    characters: {
      [Character.CHARACTER_TYPE_SORCERESS]: new DeckCharacter({
        type: Character.CHARACTER_TYPE_SORCERESS,
        index: 0,
      }),
    },
  }),
};
