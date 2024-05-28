import {
  CHARACTER_TYPE_BARBARIAN,
  CHARACTER_TYPE_DRUID,
  CHARACTER_TYPE_SORCERESS,
} from '../helpers/constants/gameVariables';
import Deck from '../models/Deck';
import useCurrencies from './useCurrencies';
import useStore from './useStore';

const useCharacterMethods = () => {
  const { data, fightState, settings } = useStore();
  const charCurrencies = useCurrencies();
  const characters = data.characters;

  const methods = {
    getCurrentHealth: () => {
      return fightState.characterCurrentHealth;
    },

    getTotalHealth: () => {
      let totalHealth = 0;
      methods.getCharactersInActiveDeck().forEach((char) => {
        totalHealth += char.getHealth();
      });
      return totalHealth;
    },

    getCurrentMana: () => {
      return fightState.characterCurrentMana;
    },

    getTotalMana: () => {
      let totalMana = 0;
      methods.getCharactersInActiveDeck().forEach((char) => {
        totalMana += char.getMana();
      });
      return totalMana;
    },

    getCharacterByType: (type) => {
      switch (type) {
        case CHARACTER_TYPE_BARBARIAN:
          return characters[CHARACTER_TYPE_BARBARIAN];
        case CHARACTER_TYPE_SORCERESS:
          return characters[CHARACTER_TYPE_SORCERESS];
        case CHARACTER_TYPE_DRUID:
          return characters[CHARACTER_TYPE_DRUID];
        default:
          return null;
      }
    },

    getAllCharacters: () => {
      return [
        characters[CHARACTER_TYPE_BARBARIAN],
        characters[CHARACTER_TYPE_SORCERESS],
        characters[CHARACTER_TYPE_DRUID],
      ];
    },

    getTotalDamage: () => {
      let totalDamage = 0;
      methods.getCharactersInActiveDeck().forEach((char) => {
        totalDamage += char.getTotalDamage();
      });
      return totalDamage;
    },

    getActiveCharactersSkills: () => {
      let activeCharacterSkills = {};
      methods.getCharactersInActiveDeck().forEach((char) => {
        activeCharacterSkills[char.type] = char.getActiveSkills();
      });
      return activeCharacterSkills;
    },

    getCharactersInActiveDeck: () => {
      const activeCharacters = new Map();
      const activeDeckName = data.activeDeckName;
      const activeDeck: Deck = data.decks[activeDeckName];
      const characterTypes = activeDeck.getAllCharacterTypes();
      characterTypes.forEach((charType) => {
        activeCharacters.set(charType, methods.getCharacterByType(charType));
      });
      return activeCharacters;
    },

    getActiveCharacter: () => {
      return methods.getCharacterByType(settings.activeCharacter);
    },

    levelUp: (charType) => {
      characters[charType].level++;
    },

    updateHealth: (bonus) => {
      const newCurrent = characters.currentHealth + bonus;
      if (newCurrent >= methods.getTotalHealth()) {
        fightState.characterCurrentHealth = methods.getTotalHealth();
      } else if (newCurrent < 0) {
        throw new Error('Unable to remove mana');
      } else {
        characters.currentHealth = newCurrent;
      }
    },

    updateMana: (bonus) => {
      const newCurrent = characters.currentMana + bonus;
      if (newCurrent >= methods.getTotalMana()) {
        fightState.characterCurrentMana = methods.getTotalMana();
      } else {
        characters.currentMana = newCurrent;
      }
    },

    takeDamage: (damage) => {
      if (damage >= characters.currentHealth) {
        fightState.characterCurrentHealth = 0;
        fightState.isAlive = false;
      } else {
        fightState.characterCurrentHealth -= damage;
      }
    },

    reset: () => {
      fightState.isAlive = true;
      fightState.characterCurrentHealth = methods.getTotalHealth();
      fightState.characterCurrentMana = methods.getTotalMana();
      fightState.characterTotalHealth = methods.getTotalHealth();
      fightState.characterTotalMana = methods.getTotalMana();
    },
    // buySkill(skill) {
    //   const conditionsReached = true;
    //   const currenciesToRemove = {};
    //   Object.entries(skill.getCost()).forEach(([type, value]) => {
    //     const currency = data.currencies[type];
    //     if (value > currency.value || (typeof value === 'number' && value <= 0)) {
    //       return;
    //     }
    //     currenciesToRemove[type] = value;
    //   });

    //   if (conditionsReached) {
    //     Object.entries(currenciesToRemove).forEach(([type, value]) => {
    //       charCurrencies.removeCurrency(type, value);
    //     });
    //     skill.persistentData.level++;
    //   }
    // },
  };

  return methods;
};

export default useCharacterMethods;
