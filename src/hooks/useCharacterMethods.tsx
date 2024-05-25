import {
  CHARACTER_TYPE_BARBARIAN,
  CHARACTER_TYPE_DRUID,
  CHARACTER_TYPE_SORCERESS,
} from '../helpers/constants/gameVariables';
import Deck from '../models/Deck';
import useStore from './useStore';

const useCharacterMethods = () => {
  const { data, gameState, settings } = useStore();
  const characters = data.characters;

  const getCurrentHealth = () => {
    return gameState.currentHealth;
  };

  const getTotalHealth = () => {
    let totalHealth = 0;
    getCharactersInActiveDeck().forEach((char) => {
      totalHealth += char.getHealth();
    });
    return totalHealth;
  };

  const getCurrentMana = () => {
    return gameState.currentMana;
  };

  const getTotalMana = () => {
    let totalMana = 0;
    getCharactersInActiveDeck().forEach((char) => {
      totalMana += char.getMana();
    });
    return totalMana;
  };

  const getCharacterByType = (type) => {
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
  };

  const getAllCharacters = () => {
    return [
      characters[CHARACTER_TYPE_BARBARIAN],
      characters[CHARACTER_TYPE_SORCERESS],
      characters[CHARACTER_TYPE_DRUID],
    ];
  };

  const getTotalDamage = () => {
    let totalDamage = 0;
    getCharactersInActiveDeck().forEach((char) => {
      totalDamage += char.getTotalDamage();
    });
    return totalDamage;
  };

  const getActiveCharactersSkills = () => {
    let activeCharacterSkills = {};
    getCharactersInActiveDeck().forEach((char) => {
      activeCharacterSkills[char.type] = char.getActiveSkills();
    });
    return activeCharacterSkills;
  };

  const getCharactersInActiveDeck = () => {
    const activeCharacters = new Map();
    const activeDeckName = data.activeDeckName;
    const activeDeck: Deck = data.decks[activeDeckName];
    const characterTypes = activeDeck.getAllCharacterTypes();
    characterTypes.forEach((charType) => {
      activeCharacters.set(charType, getCharacterByType(charType));
    });
    return activeCharacters;
  };

  const getActiveCharacter = () => {
    return getCharacterByType(settings.activeCharacter);
  };

  const levelUp = (charType) => {
    characters[charType].persistentData.level++;
  };

  const updateHealth = (bonus) => {
    const newCurrent = characters.currentHealth + bonus;
    if (newCurrent >= getTotalHealth()) {
      characters.currentHealth = getTotalHealth();
    } else if (newCurrent < 0) {
      throw new Error('Unable to remove mana');
    } else {
      characters.currentHealth = newCurrent;
    }
  };

  const updateMana = (bonus) => {
    const newCurrent = characters.currentMana + bonus;
    if (newCurrent >= getTotalMana()) {
      characters.currentMana = getTotalMana();
    } else {
      characters.currentMana = newCurrent;
    }
  };

  const takeDamage = (damage) => {
    if (damage >= characters.currentHealth) {
      characters.currentHealth = 0;
      characters.isAlive = false;
    } else {
      characters.currentHealth -= damage;
    }
  };

  const reset = () => {
    characters.isAlive = true;
    characters.currentHealth = getTotalHealth();
    characters.currentMana = getTotalMana();
  };

  return {
    getCurrentHealth,
    getTotalHealth,
    getCurrentMana,
    getTotalMana,
    getAllCharacters,
    getTotalDamage,
    getActiveCharactersSkills,
    getCharactersInActiveDeck,
    getActiveCharacter,
    getCharacterByType,
    levelUp,
    updateHealth,
    updateMana,
    takeDamage,
    reset,
  };
};

export default useCharacterMethods;
