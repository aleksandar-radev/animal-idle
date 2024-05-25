import {
  ENEMY_TYPE_BARBARIAN,
  ENEMY_TYPE_SORCERESS,
  ENEMY_TYPE_ASSASSIN,
  ENEMY_TYPE_WARRIOR,
  CHARACTER_TYPE_BARBARIAN,
  CHARACTER_TYPE_SORCERESS,
  CHARACTER_TYPE_DRUID,
  SKILLS_ATTACK,
  SKILLS_DEFENSE,
  SKILLS_UTILITY,
  ATTACK_SPEED,
  BONUS_DEFENSE,
  BONUS_GOLD,
  BONUS_HEALTH,
  CRIT_CHANCE,
  CRIT_DAMAGE,
  CURRENCY_GOLD,
  DAMAGE_FLAT,
  DAMAGE_PERCENT,
  DOUBLE_DAMAGE_CHANCE,
} from './constants/gameVariables';


import crypt from './externalLibraries/encrypt';
// @ts-ignore
import swordIcon from '../assets/sword.png';
// @ts-ignore
import berserkerAvatar from '../assets/berserker-avatar.jpg';
// @ts-ignore
import sorceressAvatar from '../assets/sorceress-avatar.jpg';
// @ts-ignore
import assassinAvatar from '../assets/assassin-avatar.jpg';
// @ts-ignore
import warriorAvatar from '../assets/warrior-avatar.jpg';
// @ts-ignore
import attackSkill from '../assets/attack-skill.png';
// @ts-ignore
import healSkill from '../assets/heal-skill.png';

import {
  ASSASSIN_AVATAR,
  BARBARIAN_AVATAR,
  SORCERESS_AVATAR,
  WARRIOR_AVATAR,
  ATTACK_SKILL_IMG,
  HEAL_SKILL_IMG,
} from './constants/gameVariables';
import { toDataURL } from '../helpers/functions';

const USE_BASE64 = false;

export function loadAssets(assets) {
  let converter = USE_BASE64
    ? toDataURL
    : (url, callback) => {
      callback(url);
    };

  converter(berserkerAvatar, (url) => {
    assets[BARBARIAN_AVATAR] = url;
  });
  converter(sorceressAvatar, (url) => {
    assets[SORCERESS_AVATAR] = url;
  });
  converter(assassinAvatar, (url) => {
    assets[ASSASSIN_AVATAR] = url;
  });
  converter(warriorAvatar, (url) => {
    assets[WARRIOR_AVATAR] = url;
  });
  converter(attackSkill, (url) => {
    assets[ATTACK_SKILL_IMG] = url;
  });
  converter(healSkill, (url) => {
    assets[HEAL_SKILL_IMG] = url;
  });
}

export const getEnemyAvatarImage = (enemyName) => {
  switch (enemyName) {
    case ENEMY_TYPE_BARBARIAN:
      return berserkerAvatar;
    case ENEMY_TYPE_SORCERESS:
      return sorceressAvatar;
    case ENEMY_TYPE_ASSASSIN:
      return assassinAvatar;
    case ENEMY_TYPE_WARRIOR:
      return warriorAvatar;
  }
};

interface EncryptedData {
  data_json: string;
}

//@ts-ignore TODO: fix
export const prepareDataForApi = (data: Data): EncryptedData => {
  let newData = { ...data };
  delete newData.data_json;

  const encryptedData = crypt.encrypt(JSON.stringify(newData));
  return { data_json: encryptedData };
};

export const getAllCharacterTypes = (): string[] => {
  return [
    CHARACTER_TYPE_BARBARIAN,
    CHARACTER_TYPE_SORCERESS,
    CHARACTER_TYPE_DRUID,
  ] as const;
};

export const getAllEnemyTypes = (): string[] => {
  return [
    ENEMY_TYPE_BARBARIAN,
    ENEMY_TYPE_SORCERESS,
    ENEMY_TYPE_ASSASSIN,
    ENEMY_TYPE_WARRIOR,
  ] as const;
};

export const getAllSkillTypes = (): string[] => {
  return [
    SKILLS_ATTACK,
    SKILLS_DEFENSE,
    SKILLS_UTILITY,
  ] as const;
};


/**
 * THE ONLY REQUIRED PROPS ARE: name, type
 * all other props have default values, but these MUST be Unique
 *
 */
export const getCharacterStats = () => {
  return {
    [CHARACTER_TYPE_BARBARIAN]: {
      name: 'Barbarian',
      type: CHARACTER_TYPE_BARBARIAN,
      health: 200,
      damage: 7,
      attackSpeed: 1000,
      mana: 0,
    },
    [CHARACTER_TYPE_SORCERESS]: {
      name: 'Sorceress',
      type: CHARACTER_TYPE_SORCERESS,
      health: 75,
      damage: 11,
      attackSpeed: 1000,
      mana: 100,
    },
    [CHARACTER_TYPE_DRUID]: {
      name: 'Druid',
      type: CHARACTER_TYPE_DRUID,
      health: 150,
      damage: 8,
      attackSpeed: 1000,
      mana: 50,
    },
  }
};

export const getAllEnemyStats = () => {
  return {
    [ENEMY_TYPE_BARBARIAN]: {
      name: ENEMY_TYPE_BARBARIAN,
      currentHealth: null,
      totalHealth: 100,
      damage: 5,
      attackSpeed: 3000,
    },
    [ENEMY_TYPE_SORCERESS]: {
      name: ENEMY_TYPE_SORCERESS,
      currentHealth: null,
      totalHealth: 60,
      damage: 20,
      attackSpeed: 4000,
    },
    [ENEMY_TYPE_ASSASSIN]: {
      name: ENEMY_TYPE_ASSASSIN,
      currentHealth: null,
      totalHealth: 80,
      damage: 10,
      attackSpeed: 2000,
    },
    [ENEMY_TYPE_WARRIOR]: {
      name: ENEMY_TYPE_WARRIOR,
      currentHealth: null,
      totalHealth: 150,
      damage: 5,
      attackSpeed: 4000,
    },
  }
};


/**
 * SKILLS IMPLEMENTATION (EFFECT) IS DEFINED IN HOOKS!!!
 */
function generateSkillDataForCharacter(baseSkillData, characterSpecificSkills = {}) {
  return {
    [SKILLS_ATTACK]: {
      ...baseSkillData[SKILLS_ATTACK],
      ...(characterSpecificSkills[SKILLS_ATTACK] || {}),
    },
    [SKILLS_DEFENSE]: {
      ...baseSkillData[SKILLS_DEFENSE],
      ...(characterSpecificSkills[SKILLS_DEFENSE] || {}),
    },
    [SKILLS_UTILITY]: {
      ...baseSkillData[SKILLS_UTILITY],
      ...(characterSpecificSkills[SKILLS_UTILITY] || {}),
    },
  };
}
// skill index used only for sorting (lower index appears first)
const baseSkillData = {
  [SKILLS_ATTACK]: {
    [DAMAGE_FLAT]: {
      index: 1,
      icon: swordIcon,
      manaCost: 22,
      requirements: {
        level: 1,
      },
      cost: {
        [CURRENCY_GOLD]: {
          type: CURRENCY_GOLD,
          multiplier: 1.5,
        },
      },
    },
    [DAMAGE_PERCENT]: {
      index: 2,
      icon: swordIcon,
      requirements: {
        level: 10,
      },
    },
    [CRIT_CHANCE]: {
      index: 3,
      icon: swordIcon,
      requirements: {
        level: 1,
      },
    },
    [CRIT_DAMAGE]: {
      index: 4,
      icon: swordIcon,
      requirements: {
        level: 10,
      },
    },
    [ATTACK_SPEED]: {
      index: 5,
      icon: swordIcon,
      requirements: {
        level: 1,
      },
    },
    [DOUBLE_DAMAGE_CHANCE]: {
      index: 6,
      icon: swordIcon,
      requirements: {
        level: 10,
      },
    },
  },
  [SKILLS_DEFENSE]: {
    [BONUS_DEFENSE]: {
      index: 1,
      requirements: {
        level: 1,
      },
    },
    [BONUS_HEALTH]: {
      index: 2,
      requirements: {
        level: 1,
      },
    },
  },
  [SKILLS_UTILITY]: {
    [BONUS_GOLD]: {
      index: 1,
      requirements: {
        level: 1,
      },
    },
  },
};

export const skillData = {
  [CHARACTER_TYPE_BARBARIAN]: generateSkillDataForCharacter(baseSkillData, {
    // Define character-specific skills
    [SKILLS_ATTACK]: {},
    [SKILLS_DEFENSE]: {},
    [SKILLS_UTILITY]: {},
  }),
  [CHARACTER_TYPE_SORCERESS]: generateSkillDataForCharacter(baseSkillData, {
    // Define character-specific skills
    [SKILLS_ATTACK]: {},
    [SKILLS_DEFENSE]: {},
    [SKILLS_UTILITY]: {},
  }),
  [CHARACTER_TYPE_DRUID]: generateSkillDataForCharacter(baseSkillData, {
    // Define character-specific skills
    [SKILLS_ATTACK]: {},
    [SKILLS_DEFENSE]: {},
    [SKILLS_UTILITY]: {},
  }),
};
