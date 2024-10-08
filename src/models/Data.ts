import { defaultCharacterData, getAllCharacterTypes } from '@/utils/game/characterData';
import Character from './Character';
import Currency from './Currency';
import Deck from './Deck';
import { defaultDeckData } from '@/utils/game/deckData';
import { defaultCurrencyData } from '@/utils/game/currencyData';

class Data {
  private _dataVersion: string;
  private _language: string;
  private _characters: { [key in ReturnType<typeof getAllCharacterTypes>[number]]: Character };
  private _totalDecks: number;
  private _activeDeckIndex: number;
  private _decks: { [key: string]: Deck };
  private _currencies: { [key: string]: Currency };
  private _id: number;
  private _currentLevel: number;
  private _highestLevel: number;
  private _premium: string;
  private _totalExperience: number;
  private _totalGold: number;

  constructor({
    dataVersion = 'v0.1',
    language = 'en',
    characters = {},
    totalDecks = 1,
    activeDeckIndex = 0,
    decks = {},
    currencies = {},
    id = 0,
    currentLevel = 0,
    highestLevel = 0,
    premium = 'no',
    totalExperience = 0,
    totalGold = 0,
  }) {
    this.dataVersion = dataVersion;
    this.language = language;
    this.characters = characters;
    this.totalDecks = totalDecks;
    this.activeDeckIndex = activeDeckIndex;
    this.decks = decks;
    this.currencies = currencies;
    this.id = id;
    this.currentLevel = currentLevel;
    this.highestLevel = highestLevel;
    this.premium = premium;
    this.totalExperience = totalExperience;
    this.totalGold = totalGold;
  }

  // Getters and Setters
  get dataVersion(): string {
    return this._dataVersion;
  }

  set dataVersion(value: string) {
    this._dataVersion = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get characters(): { [key in ReturnType<typeof getAllCharacterTypes>[number]]: Character } {
    return this._characters;
  }

  set characters(value: { [key in ReturnType<typeof getAllCharacterTypes>[number]]: Character }) {
    if (Object.keys(value).length > 0) {
      const newCharacters = {};
      Object.entries(value).forEach(([characterType, characterData]) => {
        newCharacters[characterType] = new Character(characterData);
      });
      this._characters = newCharacters;
    } else {
      this._characters = defaultCharacterData;
    }
  }

  get totalDecks(): number {
    return this._totalDecks;
  }

  set totalDecks(value: number) {
    this._totalDecks = value;
  }

  get activeDeckIndex(): number {
    return this._activeDeckIndex;
  }

  set activeDeckIndex(value: number) {
    this._activeDeckIndex = value;
  }

  get decks(): { [key: string]: Deck } {
    return this._decks;
  }

  set decks(value: { [key: string]: Deck }) {
    if (Object.keys(value).length > 0) {
      const newDecks = {};
      Object.entries(value).forEach(([deckIndex, deckData]) => {
        newDecks[deckIndex] = new Deck(deckData);
      });
      this._decks = newDecks;
    } else {
      this._decks = defaultDeckData;
    }
  }

  get currencies(): { [key: string]: Currency } {
    return this._currencies;
  }

  set currencies(value: { [key: string]: Currency }) {
    if (Object.keys(value).length > 0) {
      const newCharacters = {};
      Object.entries(value).forEach(([characterType, characterData]) => {
        newCharacters[characterType] = new Currency(characterData);
      });
      this._currencies = newCharacters;
    } else {
      this._currencies = defaultCurrencyData;
    }
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get currentLevel(): number {
    return this._currentLevel;
  }

  set currentLevel(value: number) {
    this._currentLevel = value;
  }

  get highestLevel(): number {
    return this._highestLevel;
  }

  set highestLevel(value: number) {
    this._highestLevel = value;
  }

  get premium(): string {
    return this._premium;
  }

  set premium(value: string) {
    this._premium = value;
  }

  get totalExperience(): number {
    return this._totalExperience;
  }

  set totalExperience(value: number) {
    this._totalExperience = value;
  }

  get totalGold(): number {
    return this._totalGold;
  }

  set totalGold(value: number) {
    this._totalGold = value;
  }
}

export default Data;
