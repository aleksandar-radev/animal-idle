import Character from '@/models/Character';
import Currency from '@/models/Currency';
import Requirement from '@/models/Requirement';

/**
 * THE ONLY REQUIRED PROPS ARE: name, type
 * all other props have default values, but these MUST be Unique
 *
 */
export const getCharacterStats = () => {
  return {
    [Character.CHARACTER_TYPE_BARBARIAN]: {
      type: Character.CHARACTER_TYPE_BARBARIAN,
      health: 200,
      damage: 7,
      attackSpeed: 1000,
      mana: 10,
      critChance: 0,
      critDamage: 0,
      doubleDamageChance: 0,
      requirements: [],
    },
    [Character.CHARACTER_TYPE_SORCERESS]: {
      type: Character.CHARACTER_TYPE_SORCERESS,
      health: 75,
      damage: 11,
      attackSpeed: 1000,
      mana: 100,
      critChance: 0,
      critDamage: 0,
      doubleDamageChance: 0,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 100,
        }),
      ],
    },
    [Character.CHARACTER_TYPE_DRUID]: {
      type: Character.CHARACTER_TYPE_DRUID,
      health: 150,
      damage: 8,
      attackSpeed: 1000,
      mana: 50,
      critChance: 0,
      critDamage: 0,
      doubleDamageChance: 0,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 300,
        }),
      ],
    },
  };
};

export const getAllCharacterTypes = (): string[] => {
  return [
    Character.CHARACTER_TYPE_BARBARIAN,
    Character.CHARACTER_TYPE_SORCERESS,
    Character.CHARACTER_TYPE_DRUID,
  ] as const;
};

export const defaultCharacterData = {
  [Character.CHARACTER_TYPE_BARBARIAN]: new Character({
    name: 'Barbarian',
    type: Character.CHARACTER_TYPE_BARBARIAN,
    level: 1,
    isUnlocked: true,
    skills: {},
  }),
};

export const EXP_REQUIREMENT_INITIAL = 500;
export const EXP_REQUIREMENT_INCREASE_PER_LEVEL = 20;
export const EXP_REQUIREMENT_CAP = 2480;
