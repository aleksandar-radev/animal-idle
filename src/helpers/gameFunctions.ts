import crypt from './externalLibraries/encrypt';
import swordIcon from '../assets/sword.png';
import berserkerAvatar from '../assets/berserker-avatar.jpg';
import sorceressAvatar from '../assets/sorceress-avatar.jpg';
import assassinAvatar from '../assets/assassin-avatar.jpg';
import warriorAvatar from '../assets/warrior-avatar.jpg';
import { toDataURL } from '../helpers/functions';
import Deck from '../models/Deck';
import Character from '../models/Character';
import Enemy from '../models/Enemy';
import Currency from '../models/Currency';
import Skill from '../models/Skill';

const USE_BASE64 = false;

export function loadAssets(assets) {
  let converter = USE_BASE64
    ? toDataURL
    : (url, callback) => {
        callback(url);
      };

  converter(berserkerAvatar, (url) => {
    assets[Character.CHARACTER_TYPE_BARBARIAN] = url;
  });
  converter(sorceressAvatar, (url) => {
    assets[Character.CHARACTER_TYPE_SORCERESS] = url;
  });
  converter(assassinAvatar, (url) => {
    assets[Enemy.ENEMY_TYPE_ASSASSIN] = url;
  });
  converter(warriorAvatar, (url) => {
    assets[Enemy.ENEMY_TYPE_WARRIOR] = url;
  });
}

export const getEnemyAvatarImage = (enemyName) => {
  switch (enemyName) {
    case Enemy.ENEMY_TYPE_BARBARIAN:
      return berserkerAvatar;
    case Enemy.ENEMY_TYPE_SORCERESS:
      return sorceressAvatar;
    case Enemy.ENEMY_TYPE_ASSASSIN:
      return assassinAvatar;
    case Enemy.ENEMY_TYPE_WARRIOR:
      return warriorAvatar;
  }
};

interface EncryptedData {
  data_json: string;
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

//@ts-ignore TODO: fix
export const prepareDataForApi = (data: Data): EncryptedData => {
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
  return [Skill.SKILL_TYPE_ATTACK, Skill.SKILL_TYPE_DEFENSE, Skill.SKILL_TYPE_UTILITY] as const;
};

/**
 * THE ONLY REQUIRED PROPS ARE: name, type
 * all other props have default values, but these MUST be Unique
 *
 */
export const getCharacterStats = () => {
  return {
    [Character.CHARACTER_TYPE_BARBARIAN]: {
      name: 'Barbarian',
      type: Character.CHARACTER_TYPE_BARBARIAN,
      health: 200,
      damage: 7,
      attackSpeed: 1000,
      mana: 0,
    },
    [Character.CHARACTER_TYPE_SORCERESS]: {
      name: 'Sorceress',
      type: Character.CHARACTER_TYPE_SORCERESS,
      health: 75,
      damage: 11,
      attackSpeed: 1000,
      mana: 100,
    },
    [Character.CHARACTER_TYPE_DRUID]: {
      name: 'Druid',
      type: Character.CHARACTER_TYPE_DRUID,
      health: 150,
      damage: 8,
      attackSpeed: 1000,
      mana: 50,
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

// skill index used only for sorting (lower index appears first)
const baseSkillData = {
  [Skill.SKILL_TYPE_ATTACK]: {
    [Skill.SKILL_DAMAGE_FLAT]: {
      index: 1,
      icon: swordIcon,
      manaCost: 22,
      requirements: {
        level: 1,
      },
      cost: {
        [Currency.CURRENCY_GOLD]: {
          type: Currency.CURRENCY_GOLD,
          multiplier: 1.5,
        },
      },
    },
    [Skill.SKILL_DAMAGE_PERCENT]: {
      index: 2,
      icon: swordIcon,
      requirements: {
        level: 10,
      },
    },
    [Skill.SKILL_CRIT_CHANCE]: {
      index: 3,
      icon: swordIcon,
      requirements: {
        level: 1,
      },
    },
    [Skill.SKILL_CRIT_DAMAGE]: {
      index: 4,
      icon: swordIcon,
      requirements: {
        level: 10,
      },
    },
    [Skill.SKILL_ATTACK_SPEED]: {
      index: 5,
      icon: swordIcon,
      requirements: {
        level: 1,
      },
    },
    [Skill.SKILL_DOUBLE_DAMAGE_CHANCE]: {
      index: 6,
      icon: swordIcon,
      requirements: {
        level: 10,
      },
    },
  },
  [Skill.SKILL_TYPE_DEFENSE]: {
    [Skill.SKILL_BONUS_DEFENSE]: {
      index: 1,
      requirements: {
        level: 1,
      },
    },
    [Skill.SKILL_BONUS_HEALTH]: {
      index: 2,
      requirements: {
        level: 1,
      },
    },
  },
  [Skill.SKILL_TYPE_UTILITY]: {
    [Skill.SKILL_BONUS_GOLD]: {
      index: 1,
      requirements: {
        level: 1,
      },
    },
  },
};

export const defaultDeckData = new Deck({
  name: Deck.DEFAULT_DECK_NAME,
  index: 0,
  characters: { [Character.CHARACTER_TYPE_BARBARIAN]: { characterType: Character.CHARACTER_TYPE_BARBARIAN, index: 0 } }, // remove default char
});

export const defaultCharacterData = {
  [Character.CHARACTER_TYPE_BARBARIAN]: new Character({
    name: 'Barbarian',
    type: Character.CHARACTER_TYPE_BARBARIAN,
    level: 1,
    experience: 0,
    health: 100,
    mana: 50,
    damage: 15,
    attackSpeed: 1000,
    critChance: 0,
    critDamage: 0,
    doubleDamageChance: 0,
    isUnlocked: true,
    skills: {},
  }),
};

export const defaultCurrencyData = {
  [Currency.CURRENCY_GOLD]: new Currency({
    name: 'Gold',
    index: 0,
    value: 0,
  }),
  [Currency.CURRENCY_CRYSTAL]: new Currency({
    name: 'Crystal',
    index: 0,
    value: 0,
  }),
};
