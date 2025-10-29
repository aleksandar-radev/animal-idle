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
      health: 230,
      damage: 8,
      attackSpeed: 950,
      mana: 20,
      critChance: 5,
      critDamage: 25,
      doubleDamageChance: 4,
      requirements: [],
    },
    [Character.CHARACTER_TYPE_SORCERESS]: {
      type: Character.CHARACTER_TYPE_SORCERESS,
      health: 90,
      damage: 12,
      attackSpeed: 900,
      mana: 160,
      critChance: 10,
      critDamage: 35,
      doubleDamageChance: 5,
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
      health: 200,
      damage: 9,
      attackSpeed: 1050,
      mana: 110,
      critChance: 8,
      critDamage: 30,
      doubleDamageChance: 6,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 300,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_CRYSTAL,
          value: 20,
        }),
      ],
    },
    [Character.CHARACTER_TYPE_ASSASSIN]: {
      type: Character.CHARACTER_TYPE_ASSASSIN,
      health: 150,
      damage: 16,
      attackSpeed: 750,
      mana: 80,
      critChance: 18,
      critDamage: 65,
      doubleDamageChance: 12,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CHARACTER_UNLOCKED,
          innerType: Character.CHARACTER_TYPE_BARBARIAN,
          value: 1,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 750,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_ESSENCE,
          value: 40,
        }),
      ],
    },
    [Character.CHARACTER_TYPE_WARRIOR]: {
      type: Character.CHARACTER_TYPE_WARRIOR,
      health: 280,
      damage: 10,
      attackSpeed: 1100,
      mana: 40,
      critChance: 6,
      critDamage: 25,
      doubleDamageChance: 10,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CHARACTER_UNLOCKED,
          innerType: Character.CHARACTER_TYPE_SORCERESS,
          value: 1,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 500,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_CRYSTAL,
          value: 35,
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
    Character.CHARACTER_TYPE_ASSASSIN,
    Character.CHARACTER_TYPE_WARRIOR,
  ] as const;
};

export const defaultCharacterData = {
  [Character.CHARACTER_TYPE_BARBARIAN]: new Character({
    name: 'Barbarian',
    type: Character.CHARACTER_TYPE_BARBARIAN,
    level: 4,
    isUnlocked: true,
    skills: {},
  }),
  [Character.CHARACTER_TYPE_SORCERESS]: new Character({
    name: 'Sorceress',
    type: Character.CHARACTER_TYPE_SORCERESS,
    level: 3,
    isUnlocked: true,
    skills: {},
  }),
  [Character.CHARACTER_TYPE_WARRIOR]: new Character({
    name: 'Warrior',
    type: Character.CHARACTER_TYPE_WARRIOR,
    level: 2,
    isUnlocked: true,
    skills: {},
  }),
  [Character.CHARACTER_TYPE_DRUID]: new Character({
    name: 'Druid',
    type: Character.CHARACTER_TYPE_DRUID,
    level: 1,
    isUnlocked: false,
    skills: {},
  }),
  [Character.CHARACTER_TYPE_ASSASSIN]: new Character({
    name: 'Assassin',
    type: Character.CHARACTER_TYPE_ASSASSIN,
    level: 1,
    isUnlocked: false,
    skills: {},
  }),
};

export const EXP_REQUIREMENT_INITIAL = 500;
export const EXP_REQUIREMENT_INCREASE_PER_LEVEL = 20;
export const EXP_REQUIREMENT_CAP = 2480;
