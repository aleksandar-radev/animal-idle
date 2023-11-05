import { CHARACTER_TYPE_BARBARIAN, CHARACTER_TYPE_SORCERESS, CHARACTER_TYPE_DRUID } from '../constants/gameVariables';
import Barbarian from './characters/barbarian';
import Druid from './characters/druid';
import Sorceress from './characters/sorceress';
import Upgrades from './upgrades/upgrades';

// NOTHING HERE IS PERSISTED. ALL RESETS ON REFRESH
const Characters = (store) => {
  return {
    [CHARACTER_TYPE_BARBARIAN]: Barbarian(store),
    [CHARACTER_TYPE_SORCERESS]: Sorceress(store),
    [CHARACTER_TYPE_DRUID]: Druid(store),
    upgrades: Upgrades(store),
    currentMana: 0,
    currentHealth: 0,
    isAlive: true,

    takeDamage(damage) {
      if (damage >= this.currentHealth) {
        this.currentHealth = 0;
        this.isAlive = false;
      } else {
        this.currentHealth -= damage;
      }
    },

    reset() {
      this.isAlive = true;
      this.currentHealth = this.getTotalHealth();
      this.currentMana = this.getTotalMana();
    },

    getCurrentHealth() {
      return this.currentHealth;
    },

    getTotalHealth() {
      let totalHealth = 0;
      this.getActiveCharacters().forEach((char) => {
        totalHealth += char.getHealth();
      });
      return totalHealth;
    },

    getCurrentMana() {
      return this.currentMana;
    },

    getTotalMana() {
      let totalMana = 0;
      this.getActiveCharacters().forEach((char) => {
        totalMana += char.getMana();
      });
      return totalMana;
    },

    getAllCharacters() {
      return [this[CHARACTER_TYPE_BARBARIAN], this[CHARACTER_TYPE_SORCERESS], this[CHARACTER_TYPE_DRUID]];
    },

    getTotalDamage() {
      let totalDamage = 0;

      this.getActiveCharacters().forEach((char) => {
        totalDamage += char.getDamage();
      });
      return totalDamage;
    },

    getActiveCharactersSkills() {
      let activeCharacterSkills = {};
      this.getActiveCharacters().forEach((char) => {
        activeCharacterSkills[char.type] = char.getAllSkills();
      });
      return activeCharacterSkills;
    },

    getActiveCharacters() {
      let activeCharacters = [];
      Object.values(store.data.decks[store.data.activeDeckIndex]).forEach((charType) => {
        activeCharacters.push(this.getCharacterByType(charType));
      });

      return activeCharacters;
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

    updateHealth(bonus) {
      const newCurrent = store.character.currentHealth + bonus;
      if (newCurrent >= store.character.getTotalHealth()) {
        store.character.currentHealth = store.character.getTotalHealth();
      } else if (newCurrent < 0) {
        throw new Error('Unable to remove mana');
      } else {
        store.character.currentHealth = newCurrent;
      }
    },

    updateMana(bonus) {
      const newCurrent = store.character.currentMana + bonus;
      if (newCurrent >= store.character.getTotalMana()) {
        store.character.currentMana = store.character.getTotalMana();
      } else {
        store.character.currentMana = newCurrent;
      }
    },
  };
};

export default Characters;
