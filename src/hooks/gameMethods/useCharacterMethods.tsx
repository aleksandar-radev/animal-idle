import { useMemo } from 'react';
import Character from '@/models/Character';
import Deck from '@/models/Deck';
import useGameStore from '../general/useGameStore';
import Requirement from '@/models/Requirement';
import Skill from '@/models/Skill';
import Currency from '@/models/Currency';
import DeckCharacter from '@/models/DeckCharacter';
import { getAllCharacterTypes, getCharacterStats } from '@/utils/game/characterData';
import { getSkillStats } from '@/utils/game/skillData';

const useCharacterMethods = () => {
  const { data, fightState, settings } = useGameStore();

  const skillMethods = {
    [Skill.SKILL_TYPE_DAMAGE_FLAT](character: Character) {
      if (!character.skills[Skill.SKILL_TYPE_DAMAGE_FLAT]) {
        return 0;
      }
      return character.skills[Skill.SKILL_TYPE_DAMAGE_FLAT].level;
    },
  };

  // methods format:
  // get<Prop>ByCharacterType
  const characterMethods = {
    getDamageByCharacterType(characterType: string) {
      let bonus = 0;
      const character = data.characters[characterType];

      if (character.skills[Skill.SKILL_TYPE_DAMAGE_FLAT]) {
        bonus += skillMethods[Skill.SKILL_TYPE_DAMAGE_FLAT](character);
      }

      return data.characters[characterType].damage + bonus;
    },
  };

  const methods = {
    getAllSkillsForCharacter(characterType: string): { [key: string]: Skill } {
      const allSkills = getSkillStats();

      return Object.entries(allSkills).reduce((filteredSkills, [skillType, skillData]) => {
        const characterSpecificRequirement = skillData.requirements.find(
          (req) => req.type === Requirement.REQUIREMENT_TYPE_CHARACTER_TYPE,
        );

        const isSkillApplicable =
          !characterSpecificRequirement || characterSpecificRequirement.innerType === characterType;

        if (isSkillApplicable) {
          filteredSkills[skillType] = skillData;
        }

        return filteredSkills;
      }, {});
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
          const methodName = `get${prop.charAt(0).toUpperCase() + prop.slice(1)}ByCharacterType`;
          if (typeof characterMethods[methodName] === 'function') {
            selectedStats[prop] = characterMethods[methodName](activeCharacter.type);
          } else {
            selectedStats[prop] = activeCharacter[prop];
          }
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
        totalDamage += characterMethods.getDamageByCharacterType(char.type);
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

    areRequirementsMet(requirements: Requirement[]): boolean {
      let requirementsMet = true;
      requirements.forEach((requirement: Requirement) => {
        if (requirement.type === Requirement.REQUIREMENT_TYPE_CURRENCY) {
          if (requirement.value > data.currencies[requirement.innerType].value) {
            requirementsMet = false;
          }
        }
        if (requirement.type === Requirement.REQUIREMENT_TYPE_LEVEL) {
          if (requirement.value > data.characters[requirement.innerType].level) {
            requirementsMet = false;
          }
        }
      });
      return requirementsMet;
    },

    removeRequirementResources(skill: Skill) {
      skill.requirements.forEach((requirement: Requirement) => {
        if (requirement.type === Requirement.REQUIREMENT_TYPE_CURRENCY) {
          data.currencies[requirement.innerType].value -= requirement.value;
        }
      });
    },

    buySkill(character: Character, skill: Skill): void {
      const skillCopy: Skill = new Skill(skill);

      // check if conditions are reached
      const areRequirementsMet = methods.areRequirementsMet(skill.requirements);

      if (!areRequirementsMet) {
        throw new Error('Requirements not met');
      }

      methods.removeRequirementResources(skill);

      if (character.skills[skill.type]) {
        character.skills[skill.type].level++;
      } else {
        character.skills[skill.type] = skillCopy;
      }
    },
    addExperience: (characterType: ReturnType<typeof getAllCharacterTypes>[number], experience: number) => {
      let character = methods.getActiveCharacterByType(characterType);
      character.experience += experience;
    },
  };

  const deckMethods = {
    getActiveSkillsOfCharactersInActiveDeck: () => {
      let activeCharacterSkills = {};
      deckMethods.getCharactersInActiveDeck().forEach((char) => {
        activeCharacterSkills[char.type] = Object.values(char.skills).filter((skill) => !skill.passive); // char.getActiveSkills
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

  return { ...methods, ...deckMethods, ...characterMethods, ...skillMethods };
};

export default useCharacterMethods;
