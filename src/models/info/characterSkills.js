import {
  ATTACK_SPEED,
  BONUS_DEFENSE,
  BONUS_GOLD,
  BONUS_HEALTH,
  CHARACTER_TYPE_BARBARIAN,
  CHARACTER_TYPE_DRUID,
  CHARACTER_TYPE_SORCERESS,
  CRIT_CHANCE,
  CRIT_DAMAGE,
  CURRENCY_GOLD,
  DAMAGE_FLAT,
  DAMAGE_PERCENT,
  DOUBLE_DAMAGE_CHANCE,
  SKILLS_ATTACK,
  SKILLS_DEFENSE,
  SKILLS_UTILITY,
} from '../../constants/gameVariables';
import swordIcon from '../../assets/sword.png';

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
