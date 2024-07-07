import crypt from './externalLibraries/encrypt';
import berserkerAvatar from '../assets/berserker-avatar.jpg';
import swordIcon from '../assets/sword.png';
import rageIcon from '../assets/rage.png';
import druidAvatar from '../assets/druid-avatar.png';
import sorceressAvatar from '../assets/sorceress-avatar.jpg';
import assassinAvatar from '../assets/assassin-avatar.jpg';
import warriorAvatar from '../assets/warrior-avatar.jpg';
import { toDataURL } from '../helpers/functions';
import Deck from '../models/Deck';
import Character from '../models/Character';
import Enemy from '../models/Enemy';
import Currency from '../models/Currency';
import Skill from '../models/Skill';
import Data from '../models/Data';
import Requirement from '../models/Requirement';

const USE_BASE64 = false;

export function loadAssets(assets) {
  let converter = USE_BASE64
    ? toDataURL
    : (url, callback) => {
        callback(url);
      };

  converter(berserkerAvatar, (url: string) => {
    assets[Character.CHARACTER_TYPE_BARBARIAN] = url;
  });
  converter(sorceressAvatar, (url: string) => {
    assets[Character.CHARACTER_TYPE_SORCERESS] = url;
  });
  converter(druidAvatar, (url: string) => {
    assets[Character.CHARACTER_TYPE_DRUID] = url;
  });
  converter(assassinAvatar, (url: string) => {
    assets[Enemy.ENEMY_TYPE_ASSASSIN] = url;
  });
  converter(warriorAvatar, (url: string) => {
    assets[Enemy.ENEMY_TYPE_WARRIOR] = url;
  });
  converter(swordIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_DAMAGE_FLAT] = url;
  });
  converter(rageIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_RAGE] = url;
  });
}

function stripUnderscores(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(stripUnderscores);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.startsWith('_') ? key.slice(1) : key;
      acc[newKey] = stripUnderscores(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

export const prepareDataForApi = (data: Data) => {
  let newData = stripUnderscores({ ...data });
  delete newData.data_json;

  const encryptedData = crypt.encrypt(JSON.stringify(newData));
  return { data_json: encryptedData };
};

export const getAllCharacterTypes = (): string[] => {
  return [
    Character.CHARACTER_TYPE_BARBARIAN,
    Character.CHARACTER_TYPE_SORCERESS,
    Character.CHARACTER_TYPE_DRUID,
  ] as const;
};

export const getAllEnemyTypes = (): string[] => {
  return [
    Enemy.ENEMY_TYPE_BARBARIAN,
    Enemy.ENEMY_TYPE_SORCERESS,
    Enemy.ENEMY_TYPE_ASSASSIN,
    Enemy.ENEMY_TYPE_WARRIOR,
  ] as const;
};

export const getAllSkillTypes = (): string[] => {
  return [Skill.SKILL_CATEGORY_ATTACK, Skill.SKILL_CATEGORY_DEFENSE, Skill.SKILL_CATEGORY_UTILITY] as const;
};

export const getRequirementTypes = () => {
  return [
    Requirement.REQUIREMENT_TYPE_LEVEL,
    Requirement.REQUIREMENT_TYPE_CURRENCY,
    Requirement.REQUIREMENT_TYPE_SKILL,
    Requirement.REQUIREMENT_TYPE_CHARACTER_UNLOCKED,
    Requirement.REQUIREMENT_TYPE_UPGRADE,
  ] as const;
};

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
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 1,
        }),
      ],
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
          value: 1,
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
          value: 1,
        }),
      ],
    },
  };
};

export const getAllEnemyStats = () => {
  return {
    [Enemy.ENEMY_TYPE_BARBARIAN]: {
      name: Enemy.ENEMY_TYPE_BARBARIAN,
      type: Enemy.ENEMY_TYPE_BARBARIAN,
      health: 100,
      mana: 0,
      damage: 5,
      attackSpeed: 3000,
    },
    [Enemy.ENEMY_TYPE_SORCERESS]: {
      name: Enemy.ENEMY_TYPE_SORCERESS,
      type: Enemy.ENEMY_TYPE_SORCERESS,
      health: 60,
      mana: 10,
      damage: 20,
      attackSpeed: 4000,
    },
    [Enemy.ENEMY_TYPE_ASSASSIN]: {
      name: Enemy.ENEMY_TYPE_ASSASSIN,
      type: Enemy.ENEMY_TYPE_ASSASSIN,
      health: 80,
      mana: 0,
      damage: 10,
      attackSpeed: 2000,
    },
    [Enemy.ENEMY_TYPE_WARRIOR]: {
      name: Enemy.ENEMY_TYPE_WARRIOR,
      type: Enemy.ENEMY_TYPE_WARRIOR,
      health: 150,
      mana: 0,
      damage: 5,
      attackSpeed: 4000,
    },
  };
};

export const getSkillStats = (): { [key: string]: Skill } => {
  return {
    [Skill.SKILL_TYPE_DAMAGE_FLAT]: {
      name: 'Flat Damage',
      type: Skill.SKILL_TYPE_DAMAGE_FLAT,
      category: Skill.SKILL_CATEGORY_ATTACK,
      index: 1,
      passive: true,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_BARBARIAN,
          value: 1,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 1,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_RAGE]: {
      name: 'Rage',
      type: Skill.SKILL_TYPE_RAGE,
      category: Skill.SKILL_CATEGORY_ATTACK,
      index: 1,
      passive: false,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_BARBARIAN,
          value: 1,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 1,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CHARACTER_TYPE,
          innerType: Character.CHARACTER_TYPE_BARBARIAN,
          value: 1,
        }),
      ],
    } as Skill,
  };
};

// SKILLS
// skill index used only for sorting (lower index appears first)
// export const baseCharacterSkills = {
//   [Skill.SKILL_TYPE_DAMAGE_FLAT]: new Skill({
//     name: Skill.SKILL_TYPE_DAMAGE_FLAT,
//     type: Skill.SKILL_CATEGORY_ATTACK,
//     index: 1,
//     requirements: {
//       level: 1,
//     },
//     cost: {
//       [Currency.CURRENCY_TYPE_GOLD]: {
//         type: Currency.CURRENCY_TYPE_GOLD,
//         multiplier: 1.5,
//       },
//     },
//   }),
//   [Skill.SKILL_TYPE_DAMAGE_PERCENT]: new Skill({
//     name: Skill.SKILL_TYPE_DAMAGE_PERCENT,
//     type: Skill.SKILL_CATEGORY_ATTACK,
//     index: 2,
//     requirements: {
//       level: 1,
//     },
//     cost: {
//       [Currency.CURRENCY_TYPE_GOLD]: {
//         type: Currency.CURRENCY_TYPE_GOLD,
//         multiplier: 1.5,
//       },
//     },
//   }),
//   [Skill.SKILL_TYPE_CRIT_CHANCE]: new Skill({
//     name: Skill.SKILL_TYPE_CRIT_CHANCE,
//     type: Skill.SKILL_CATEGORY_ATTACK,
//     index: 3,
//     requirements: {
//       level: 1,
//     },
//     cost: {
//       [Currency.CURRENCY_TYPE_GOLD]: {
//         type: Currency.CURRENCY_TYPE_GOLD,
//         multiplier: 1.5,
//       },
//     },
//   }),
//   [Skill.SKILL_TYPE_CRIT_DAMAGE]: new Skill({
//     name: Skill.SKILL_TYPE_CRIT_DAMAGE,
//     type: Skill.SKILL_CATEGORY_ATTACK,
//     index: 4,
//     requirements: {
//       level: 1,
//     },
//     cost: {
//       [Currency.CURRENCY_TYPE_GOLD]: {
//         type: Currency.CURRENCY_TYPE_GOLD,
//         multiplier: 1.5,
//       },
//     },
//   }),
//   [Skill.SKILL_TYPE_ATTACK_SPEED]: new Skill({
//     name: Skill.SKILL_TYPE_ATTACK_SPEED,
//     type: Skill.SKILL_CATEGORY_ATTACK,
//     index: 5,
//     requirements: {
//       level: 1,
//     },
//     cost: {
//       [Currency.CURRENCY_TYPE_GOLD]: {
//         type: Currency.CURRENCY_TYPE_GOLD,
//         multiplier: 1.5,
//       },
//     },
//   }),
//   [Skill.SKILL_TYPE_DOUBLE_DAMAGE_CHANCE]: new Skill({
//     name: Skill.SKILL_TYPE_DOUBLE_DAMAGE_CHANCE,
//     type: Skill.SKILL_CATEGORY_ATTACK,
//     index: 6,
//     requirements: {
//       level: 1,
//     },
//     cost: {
//       [Currency.CURRENCY_TYPE_GOLD]: {
//         type: Currency.CURRENCY_TYPE_GOLD,
//         multiplier: 1.5,
//       },
//     },
//   }),
//   [Skill.SKILL_BONUS_DEFENSE]: new Skill({
//     name: Skill.SKILL_BONUS_DEFENSE,
//     type: Skill.SKILL_CATEGORY_DEFENSE,
//     index: 7,
//     requirements: {
//       level: 1,
//     },
//     cost: {
//       [Currency.CURRENCY_TYPE_GOLD]: {
//         type: Currency.CURRENCY_TYPE_GOLD,
//         multiplier: 1.5,
//       },
//     },
//   }),
//   [Skill.SKILL_TYPE_BONUS_HEALTH]: new Skill({
//     name: Skill.SKILL_TYPE_BONUS_HEALTH,
//     type: Skill.SKILL_CATEGORY_DEFENSE,
//     index: 8,
//     requirements: {
//       level: 1,
//     },
//     cost: {
//       [Currency.CURRENCY_TYPE_GOLD]: {
//         type: Currency.CURRENCY_TYPE_GOLD,
//         multiplier: 1.5,
//       },
//     },
//   }),
//   [Skill.SKILL_TYPE_BONUS_GOLD]: new Skill({
//     name: Skill.SKILL_TYPE_BONUS_GOLD,
//     type: Skill.SKILL_CATEGORY_UTILITY,
//     index: 9,
//     requirements: {
//       level: 1,
//     },
//     cost: {
//       [Currency.CURRENCY_TYPE_GOLD]: {
//         type: Currency.CURRENCY_TYPE_GOLD,
//         multiplier: 1.5,
//       },
//     },
//   }),
// };

// export const baseCharacterSpecificSkills = {
//   [Character.CHARACTER_TYPE_BARBARIAN]: {
//     [Skill.SKILL_TYPE_RAGE]: new Skill({
//       type: Skill.SKILL_TYPE_RAGE,
//       category: Skill.SKILL_CATEGORY_ATTACK,
//       index: 1,
//       passive: false,
//       manaCost: 5,
//       requirements: {
//         level: 1,
//       },
//       cost: {
//         [Currency.CURRENCY_TYPE_GOLD]: {
//           type: Currency.CURRENCY_TYPE_GOLD,
//         },
//       },
//     }),
//   },
// };

// DEFAULTS
export const defaultDeckData = {
  '0': new Deck({
    name: Deck.DEFAULT_DECK_NAME,
    index: 0,
    characters: {
      [Character.CHARACTER_TYPE_BARBARIAN]: { characterType: Character.CHARACTER_TYPE_BARBARIAN, index: 0 },
    }, // remove default char
  }),
};

export const defaultCharacterData = {
  [Character.CHARACTER_TYPE_BARBARIAN]: new Character({
    name: 'Barbarian',
    type: Character.CHARACTER_TYPE_BARBARIAN,
    level: 1,
    experience: 0,
    isUnlocked: true,
    skills: {},
  }),
};

export const defaultCurrencyData = {
  [Currency.CURRENCY_TYPE_GOLD]: new Currency({
    type: Currency.CURRENCY_TYPE_GOLD,
    name: 'Gold',
    index: 0,
    value: 0,
  }),
  [Currency.CURRENCY_TYPE_CRYSTAL]: new Currency({
    type: Currency.CURRENCY_TYPE_CRYSTAL,
    name: 'Crystal',
    index: 1,
    value: 0,
  }),
};
