import { CHARACTER_TYPE_BARBARIAN, CHARACTER_TYPE_SORCERESS, CHARACTER_TYPE_DRUID } from '../constants/gameVariables';
import BaseCharacter from './characters/base/baseCharacter';

// NOTHING HERE IS PERSISTED. ALL RESETS ON REFRESH
const Characters = (store) => {
  return {
    [CHARACTER_TYPE_BARBARIAN]: BaseCharacter(store, CHARACTER_TYPE_BARBARIAN),
    [CHARACTER_TYPE_SORCERESS]: BaseCharacter(store, CHARACTER_TYPE_SORCERESS),
    [CHARACTER_TYPE_DRUID]: BaseCharacter(store, CHARACTER_TYPE_DRUID),
    currentMana: 0,
    currentHealth: 0,
    isAlive: true,

    getCurrentHealth() {
      return this.currentHealth;
    },

    getTotalHealth() {
      let totalHealth = 0;
      this.getCharactersInActiveDeck().forEach((char) => {
        totalHealth += char.getHealth();
      });
      return totalHealth;
    },

    getCurrentMana() {
      return this.currentMana;
    },

    getTotalMana() {
      let totalMana = 0;
      this.getCharactersInActiveDeck().forEach((char) => {
        totalMana += char.getMana();
      });
      return totalMana;
    },

    getAllCharacters() {
      return [this[CHARACTER_TYPE_BARBARIAN], this[CHARACTER_TYPE_SORCERESS], this[CHARACTER_TYPE_DRUID]];
    },

    getTotalDamage() {
      let totalDamage = 0;

      this.getCharactersInActiveDeck().forEach((char) => {
        totalDamage += char.getTotalDamage();
      });
      return totalDamage;
    },

    getActiveCharactersSkills() {
      let activeCharacterSkills = {};
      this.getCharactersInActiveDeck().forEach((char) => {
        activeCharacterSkills[char.type] = char.getActiveSkills();
      });
      return activeCharacterSkills;
    },

    getCharactersInActiveDeck() {
      let activeCharacters = [];
      Object.values(store.data.decks[store.data.activeDeckIndex]).forEach((charType) => {
        activeCharacters.push(this.getCharacterByType(charType));
      });

      return activeCharacters;
    },

    getActiveCharacter() {
      return this.getCharacterByType(store.settings.activeCharacter);
    },

    getCharacterByType(type) {
      switch (type) {
        case CHARACTER_TYPE_BARBARIAN:
          return this[CHARACTER_TYPE_BARBARIAN];
        case CHARACTER_TYPE_SORCERESS:
          return this[CHARACTER_TYPE_SORCERESS];
        case CHARACTER_TYPE_DRUID:
          return this[CHARACTER_TYPE_DRUID];
        default:
          return null;
      }
    },
  };
};

export default Characters;
