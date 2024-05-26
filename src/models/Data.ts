import {
  CURRENCY_GOLD,
  CHARACTER_TYPE_BARBARIAN,
  CURRENCY_CRYSTAL,
} from '../helpers/constants/gameVariables';
import { getAllCharacterTypes } from '../helpers/gameFunctions';
import Character from './Character';
import Currency from './Currency';
import Deck from './Deck';
import Enemy from './Enemy';

//! ONLY CLASS THAT IS PERSISTED IN DB
class Data {
  public dataVersion: string;
  public language: string;
  public characters: { [key in ReturnType<typeof getAllCharacterTypes>[number]]: Character };
  public totalDecks: number;
  public activeDeckName: string;
  public decks: { [key: string]: Deck };
  public charactersMap: { [key: number]: string };
  public enemy: Enemy;
  public renderChanges: number;
  public currencies: { [key: string]: Currency };
  public id: number;
  public highestLevel: number;
  public premium: string;
  public totalExperience: number;
  public totalGold: number;

  constructor({
    dataVersion,
    language,
    characters,
    totalDecks,
    activeDeckName,
    decks,
    charactersMap,
    enemy,
    renderChanges,
    currencies,
    id,
    highestLevel,
    premium,
    totalExperience,
    totalGold }) {

    this.dataVersion = dataVersion || 'v0.1';
    this.language = language || 'en';
    this.totalDecks = totalDecks || 1;
    this.activeDeckName = activeDeckName || 'default';

    this.characters = characters || {
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
        renderChanges: 0,
        isUnlocked: true,
        skills: {}
      })
    }
    this.decks = decks || {
      'default': new Deck({ name: 'default', index: 0, characters: { [CHARACTER_TYPE_BARBARIAN]: { characterType: CHARACTER_TYPE_BARBARIAN, index: 0 } } }),
    };

    this.charactersMap = charactersMap || {};

    this.enemy = enemy || new Enemy({});

    this.renderChanges = renderChanges || 0;

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
    this.highestLevel = highestLevel || 0;
    this.premium = premium || 'no';
    this.totalExperience = totalExperience || 0;
    this.totalGold = totalGold || 0;
  }

  renderChange() {
    this.renderChanges++;
    if (this.renderChanges > 1e99) {
      this.renderChanges = 0;
    }
  }
}

export default Data;
