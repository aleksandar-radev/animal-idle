import Character from '@/models/Character';
import Currency from '@/models/Currency';
import Requirement from '@/models/Requirement';
import Skill from '@/models/Skill';

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
          value: 5,
          modifier: 5,
          modifierType: Requirement.REQUIREMENT_MODIFIER_TYPE_LEVEL,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_RAGE]: {
      name: 'Rage',
      type: Skill.SKILL_TYPE_RAGE,
      category: Skill.SKILL_CATEGORY_ATTACK,
      index: 1,
      passive: false,
      cooldown: 2000,
      manaCost: 5,
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
          name: '',
          type: Requirement.REQUIREMENT_TYPE_CHARACTER_TYPE,
          innerType: Character.CHARACTER_TYPE_BARBARIAN,
          value: 1,
        }),
      ],
    } as Skill,
  };
};

export const getAllSkillTypes = (): string[] => {
  return [Skill.SKILL_CATEGORY_ATTACK, Skill.SKILL_CATEGORY_DEFENSE, Skill.SKILL_CATEGORY_UTILITY] as const;
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
