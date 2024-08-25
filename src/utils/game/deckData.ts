import Character from '@/models/Character';
import Deck from '@/models/Deck';

export const defaultDeckData = {
  '0': new Deck({
    name: Deck.DEFAULT_DECK_NAME,
    index: 0,
    characters: {
      [Character.CHARACTER_TYPE_BARBARIAN]: { characterType: Character.CHARACTER_TYPE_BARBARIAN, index: 0 },
    }, // remove default char
  }),
};
