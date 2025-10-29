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
    [Skill.SKILL_TYPE_DAMAGE_PERCENT]: {
      name: 'Sharpened Edge',
      type: Skill.SKILL_TYPE_DAMAGE_PERCENT,
      category: Skill.SKILL_CATEGORY_ATTACK,
      index: 2,
      passive: true,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_BARBARIAN,
          value: 3,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 120,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_CRIT_CHANCE]: {
      name: 'Keen Eye',
      type: Skill.SKILL_TYPE_CRIT_CHANCE,
      category: Skill.SKILL_CATEGORY_ATTACK,
      index: 3,
      passive: true,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_ASSASSIN,
          value: 1,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_ESSENCE,
          value: 15,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_CRIT_DAMAGE]: {
      name: 'Fatal Flourish',
      type: Skill.SKILL_TYPE_CRIT_DAMAGE,
      category: Skill.SKILL_CATEGORY_ATTACK,
      index: 4,
      passive: true,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_ASSASSIN,
          value: 2,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_ESSENCE,
          value: 35,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_ATTACK_SPEED]: {
      name: 'Battle Rhythm',
      type: Skill.SKILL_TYPE_ATTACK_SPEED,
      category: Skill.SKILL_CATEGORY_ATTACK,
      index: 5,
      passive: true,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_WARRIOR,
          value: 2,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 180,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_DOUBLE_DAMAGE_CHANCE]: {
      name: 'Reckless Charge',
      type: Skill.SKILL_TYPE_DOUBLE_DAMAGE_CHANCE,
      category: Skill.SKILL_CATEGORY_ATTACK,
      index: 6,
      passive: true,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_WARRIOR,
          value: 3,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_CRYSTAL,
          value: 18,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_BONUS_HEALTH]: {
      name: 'Natures Gift',
      type: Skill.SKILL_TYPE_BONUS_HEALTH,
      category: Skill.SKILL_CATEGORY_DEFENSE,
      index: 1,
      passive: true,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_DRUID,
          value: 2,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_GOLD,
          value: 160,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_BONUS_DEFENSE]: {
      name: 'Bulwark',
      type: Skill.SKILL_TYPE_BONUS_DEFENSE,
      category: Skill.SKILL_CATEGORY_DEFENSE,
      index: 2,
      passive: true,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_WARRIOR,
          value: 2,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_CRYSTAL,
          value: 12,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_BONUS_GOLD]: {
      name: 'Treasure Sense',
      type: Skill.SKILL_TYPE_BONUS_GOLD,
      category: Skill.SKILL_CATEGORY_UTILITY,
      index: 1,
      passive: true,
      requirements: [
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_LEVEL,
          innerType: Character.CHARACTER_TYPE_SORCERESS,
          value: 2,
        }),
        new Requirement({
          type: Requirement.REQUIREMENT_TYPE_CURRENCY,
          innerType: Currency.CURRENCY_TYPE_CRYSTAL,
          value: 10,
        }),
      ],
    } as Skill,
    [Skill.SKILL_TYPE_RAGE]: {
      name: 'Rage',
      type: Skill.SKILL_TYPE_RAGE,
      category: Skill.SKILL_CATEGORY_ATTACK,
      index: 7,
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
