import {
  CURRENCY_GOLD,
  CHARACTER_TYPE_BARBARIAN,
  CURRENCY_CRYSTAL,
  DEFAULT_DECK_NAME,
} from '../helpers/constants/gameVariables';
import { getAllCharacterTypes } from '../helpers/gameFunctions';
import Character from './Character';
import Currency from './Currency';
import Deck from './Deck';
import Enemy from './Enemy';

//! ONLY CLASS THAT IS PERSISTED IN DB
class Data {
  dataVersion: string;
  language: string;
  characters: { [key in ReturnType<typeof getAllCharacterTypes>[number]]: Character };
  totalDecks: number;
  activeDeckName: string;
  decks: { [key: string]: Deck };
  currencies: { [key: string]: Currency };
  id: number;
  currentLevel: number;
  highestLevel: number;
  premium: string;
  totalExperience: number;
  totalGold: number;

  constructor({
    dataVersion,
    language,
    characters,
    totalDecks,
    activeDeckName,
    decks,
    currencies,
    id,
    currentLevel,
    highestLevel,
    premium,
    totalExperience,
    totalGold,
  }) {
    this.dataVersion = dataVersion;
    this.language = language;
    this.totalDecks = totalDecks;
    this.activeDeckName = activeDeckName;

    this.characters = {};
    Object.entries(characters).forEach(([characterType, characterData]) => {
      this.characters[characterType] = new Character(characterData as Character);
    });

    this.decks = {};
    Object.entries(decks).forEach(([deckName, deckData]) => {
      this.decks[deckName] = new Deck(deckData as Deck);
    });

    this.currencies = currencies || {
      [CURRENCY_GOLD]: {
        value: 0,
      },
      [CURRENCY_CRYSTAL]: {
        value: 0,
      },
    };

    // db props
    this.id = id || 0;
    this.currentLevel = currentLevel || 0;
    this.highestLevel = highestLevel || 0;
    this.premium = premium || 'no';
    this.totalExperience = totalExperience || 0;
    this.totalGold = totalGold || 0;
  }

  static initialData() {
    const dataVersion = 'v0.1';
    const language = 'en';
    const totalDecks = 1;
    const activeDeckName = DEFAULT_DECK_NAME;

    const characters = {
      [CHARACTER_TYPE_BARBARIAN]: new Character({
        name: 'Barbarian',
        type: CHARACTER_TYPE_BARBARIAN,
        level: 1,
        experience: 0,
        health: 100,
        mana: 50,
        damage: 15,
        attackSpeed: 1000,
        critChance: 0,
        critDamage: 0,
        doubleDamageChance: 0,
        isUnlocked: true,
        skills: {},
      }),
    };

    const decks = {
      [DEFAULT_DECK_NAME]: new Deck({
        name: DEFAULT_DECK_NAME,
        index: 0,
        characters: { [CHARACTER_TYPE_BARBARIAN]: { characterType: CHARACTER_TYPE_BARBARIAN, index: 0 } },
      }),
    };

    return {
      dataVersion,
      language,
      totalDecks,
      activeDeckName,
      characters,
      decks,
    };
  }
}

export default Data;
