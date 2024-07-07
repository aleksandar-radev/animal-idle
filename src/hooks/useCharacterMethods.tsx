import { useMemo } from 'react';
import Character from '../models/Character';
import Deck from '../models/Deck';
import useStore from './useStore';
import { getAllCharacterTypes, getCharacterStats, getSkillStats } from '../helpers/gameFunctions';
import Requirement from '../models/Requirement';
import Skill from '../models/Skill';
import Currency from '../models/Currency';
import { get } from 'http';
import DeckCharacter from '../models/DeckCharacter';

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
      deckMethods.getCharactersInActiveDeck().forEach((char) => {
        totalHealth += char.health;
      });
      return totalHealth;
    },

    getCurrentMana: () => {
      return fightState.characterCurrentMana;
    },

    getTotalMana: () => {
      let totalMana = 0;
      deckMethods.getCharactersInActiveDeck().forEach((char) => {
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

    getAllCharacterTypes: () => {
      return getAllCharacterTypes();
    },

    getTotalDamage: () => {
      let totalDamage = 0;
      deckMethods.getCharactersInActiveDeck().forEach((char) => {
        totalDamage += char.damage;
      });
      return totalDamage;
    },

    buyCharacter: (characterType: ReturnType<typeof getAllCharacterTypes>[number]) => {
      const character = new Character({
        name: characterType,
        type: characterType,
        isUnlocked: true,
      });
      data.characters[characterType] = character;

      if (!character) {
        throw new Error('Character does not exist');
      }
    },

    getActiveCharacter: () => {
      return methods.getActiveCharacterByType(settings.activeCharacter);
    },

    levelUp: (charType) => {
      data.characters[charType].level++;
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
      if (damage >= fightState.characterCurrentHealth) {
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

  const deckMethods = {
    getActiveSkillsOfCharactersInActiveDeck: () => {
      let activeCharacterSkills = {};
      deckMethods.getCharactersInActiveDeck().forEach((char) => {
        activeCharacterSkills[char.type] = []; // char.getActiveSkills
      });
      return activeCharacterSkills;
    },

    getCharactersInDeck: (deckIndex: string): Map<string, Character> => {
      const charactersInDeck = new Map();
      const deck: Deck = data.decks[deckIndex];
      const deckCharacters = Object.keys(deck.characters);
      deckCharacters.forEach((charType) => {
        charactersInDeck.set(charType, methods.getActiveCharacterByType(charType));
      });
      return charactersInDeck;
    },

    getCountOfCharactersInDeck: (deckIndex: string): number => {
      const deck: Deck = data.decks[deckIndex];
      const deckCharacters = Object.keys(deck.characters);
      return deckCharacters.length;
    },

    addCharacterToDeck: (deckIndex: string, characterType: ReturnType<typeof getAllCharacterTypes>[number]) => {
      if (!(deckIndex in data.decks)) {
        throw new Error("Adding character to Deck failed. Deck doesn't exist.");
      }
      if (!(characterType in data.characters)) {
        throw new Error('Cannot add character. Character not available.');
      }
      data.decks[deckIndex].characters[characterType] = new DeckCharacter({
        type: characterType,
        index: deckMethods.getLastCharacterIndexFromDeck(deckIndex) + 1,
      });
    },

    getLastCharacterIndexFromDeck: (deckIndex: string): number => {
      let highestIndex = -1;
      const deck: Deck = data.decks[deckIndex];

      Object.values(deck.characters).forEach((char) => {
        if (char.index > highestIndex) {
          highestIndex = char.index;
        }
      });

      return highestIndex;
    },

    removeCharacterFromDeck: (deckIndex: string, characterType: ReturnType<typeof getAllCharacterTypes>[number]) => {
      if (!(deckIndex in data.decks)) {
        throw new Error("Removing character from Deck failed. Deck doesn't exist.");
      }
      if (!(characterType in data.decks[deckIndex].characters)) {
        throw new Error("Cannot remove character. Character doesn't exist.");
      }
      delete data.decks[deckIndex].characters[characterType];
    },

    getCharactersInActiveDeck: useMemo(() => {
      return (): Map<string, Character> => {
        const activeCharacters = new Map();
        const activeDeck: Deck = data.decks[data.activeDeckIndex];
        if (!activeDeck) {
          return new Map();
        }
        const activeDeckCharacters = Object.keys(activeDeck.characters);
        activeDeckCharacters.forEach((charType) => {
          activeCharacters.set(charType, methods.getActiveCharacterByType(charType));
        });
        return activeCharacters;
      };
    }, [data.activeDeckIndex, data.decks]),

    getDeckByName: (deckIndex: string) => {
      return data.decks[deckIndex];
    },

    getAllDecks: () => {
      return Object.values(data.decks).sort((a, b) => a.index - b.index);
    },

    getDeckCost: () => {
      const costs = {
        '1': 100,
        '2': 2000,
        '3': 25000,
        '4': 100000,
        '5': 1000000,
      };
      return costs[data.totalDecks] || Number.POSITIVE_INFINITY;
    },

    getCanBuyDeck: () => {
      const currentGold = data.currencies[Currency.CURRENCY_TYPE_GOLD].value;
      const deckCost = deckMethods.getDeckCost();

      return currentGold > deckCost;
    },

    buyDeck: () => {
      if (!deckMethods.getCanBuyDeck()) {
        throw new Error('Not enough gold to buy deck');
      }

      data.totalDecks++;
      const newDeck = new Deck({
        name: 'New Deck ' + data.totalDecks,
        index: data.totalDecks,
        characters: {},
      });
      data.decks[newDeck.index] = newDeck;
      return data.decks;
    },

    setActiveDeck: (deckIndex: number) => {
      data.activeDeckIndex = deckIndex;
    },
  };

  return { ...methods, ...deckMethods };
};

export default useCharacterMethods;
