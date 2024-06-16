import { useMemo } from 'react';
import Character from '../models/Character';
import Deck from '../models/Deck';
import useStore from './useStore';
import { getAllCharacterTypes, getCharacterStats, getSkillStats } from '../helpers/gameFunctions';
import Requirement from '../models/Requirement';
import Skill from '../models/Skill';

const useCharacterMethods = () => {
  const { data, fightState, settings } = useStore();

  const methods = {
    getAllSkillsForCharacter(characterType: string): { [key: string]: Skill } {
      // filter by requirement type character (if no such requirement, still add it)
      const allSkills = getSkillStats();
      const filteredSkills = {};

      Object.entries(allSkills).forEach(([skillType, skillData]) => {
        let isCharacterSpecific = false;
        let specificCharacterType = null;
        skillData.requirements.forEach((requirementData) => {
          if (
            requirementData.type === Requirement.REQUIREMENT_TYPE_CHARACTER_TYPE &&
            characterType !== requirementData.innerType
          ) {
            isCharacterSpecific = true;
            specificCharacterType = requirementData.innerType;
            return;
          }
        });
        if (isCharacterSpecific && specificCharacterType !== characterType) return;
        filteredSkills[skillType] = skillData;
      });

      return { ...filteredSkills };
    },

    getAllStatsOfActiveCharacter() {
      const activeCharacter = methods.getActiveCharacter();
      if (!activeCharacter) {
        return null;
      }

      // Create an object with only the selected properties
      const selectedStats = {};
      Character.CHARACTER_DISPLAY_PROPS.forEach((prop) => {
        if (prop in activeCharacter) {
          selectedStats[prop] = activeCharacter[prop];
        }
      });

      return selectedStats;
    },

    getCurrentHealth: () => {
      return fightState.characterCurrentHealth;
    },

    getTotalHealth: () => {
      let totalHealth = 0;
      methods.getCharactersInActiveDeck().forEach((char) => {
        totalHealth += char.health;
      });
      return totalHealth;
    },

    getCurrentMana: () => {
      return fightState.characterCurrentMana;
    },

    getTotalMana: () => {
      let totalMana = 0;
      methods.getCharactersInActiveDeck().forEach((char) => {
        totalMana += char.mana;
      });
      return totalMana;
    },

    getActiveCharacterByType: (type: ReturnType<typeof getAllCharacterTypes>[number]) => {
      const character = data.characters[type];
      return character ? character : null;
    },

    getCharacterByType: (type: ReturnType<typeof getAllCharacterTypes>[number]) => {
      const character = getCharacterStats()[type];
      return character ? character : null;
    },

    getAllCharacters: () => {
      return getAllCharacterTypes();
    },

    getTotalDamage: () => {
      let totalDamage = 0;
      methods.getCharactersInActiveDeck().forEach((char) => {
        totalDamage += char.damage;
      });
      return totalDamage;
    },

    getActiveSkillsOfCharactersInActiveDeck: () => {
      let activeCharacterSkills = {};
      methods.getCharactersInActiveDeck().forEach((char) => {
        activeCharacterSkills[char.type] = []; // char.getActiveSkills
      });
      return activeCharacterSkills;
    },

    getCharactersInActiveDeck: useMemo(() => {
      return (): Map<string, Character> => {
        const activeCharacters = new Map();
        const activeDeck: Deck = data.decks[data.activeDeckName];
        const activeDeckCharacters = Object.keys(activeDeck.characters);
        activeDeckCharacters.forEach((charType) => {
          activeCharacters.set(charType, methods.getActiveCharacterByType(charType));
        });
        return activeCharacters;
      };
    }, [data.activeDeckName, data.decks]),

    getActiveCharacter: () => {
      return methods.getActiveCharacterByType(settings.activeCharacter);
    },

    levelUp: (charType) => {
      data.characters[charType].level++;
    },

    updateHealth: (bonus) => {
      const newCurrent = data.characters.currentHealth + bonus;
      if (newCurrent >= methods.getTotalHealth()) {
        fightState.characterCurrentHealth = methods.getTotalHealth();
      } else if (newCurrent < 0) {
        throw new Error('Unable to remove mana');
      } else {
        data.characters.currentHealth = newCurrent;
      }
    },

    updateMana: (bonus) => {
      const newCurrent = data.characters.currentMana + bonus;
      if (newCurrent >= methods.getTotalMana()) {
        fightState.characterCurrentMana = methods.getTotalMana();
      } else {
        data.characters.currentMana = newCurrent;
      }
    },

    takeDamage: (damage) => {
      if (damage >= data.characters.currentHealth) {
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
