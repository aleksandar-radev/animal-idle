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

const baseSkillData = {
  [SKILLS_ATTACK]: {
    [DAMAGE_FLAT]: {
      icon: swordIcon,
      manaCost: 22,
    },
    [DAMAGE_PERCENT]: {
      icon: swordIcon,
    },
    [CRIT_CHANCE]: {
      icon: swordIcon,
    },
    [CRIT_DAMAGE]: {
      icon: swordIcon,
    },
    [ATTACK_SPEED]: {
      icon: swordIcon,
    },
    [DOUBLE_DAMAGE_CHANCE]: {
      icon: swordIcon,
    },
  },
  [SKILLS_DEFENSE]: {
    [BONUS_DEFENSE]: {},
    [BONUS_HEALTH]: {},
  },
  [SKILLS_UTILITY]: {
    [BONUS_GOLD]: {},
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
