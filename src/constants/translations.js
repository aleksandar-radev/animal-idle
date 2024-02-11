import {
  DAMAGE_FLAT,
  DAMAGE_PERCENT,
  ATTACK_SPEED,
  CRIT_CHANCE,
  CRIT_DAMAGE,
  DOUBLE_DAMAGE_CHANCE,
  BONUS_HEALTH,
} from './gameVariables';

export const en = {
  // Attack
  [DAMAGE_FLAT]: 'Bonus Flat Damage',
  [DAMAGE_FLAT + '-description']: (amount) => `Increases your damage by ${amount}`,
  [DAMAGE_PERCENT]: 'Bonus % Damage',
  [DAMAGE_PERCENT + '-description']: (amount) => `Increases your damage by ${amount} %`,
  [CRIT_CHANCE]: 'Chance to crit',
  [CRIT_CHANCE + '-description']: (amount) => `Increases your chance to crit by ${amount} %`,
  [CRIT_DAMAGE]: 'Chance crit damage',
  [CRIT_DAMAGE + '-description']: (amount) => `Increases your critical damage by ${amount} %`,
  [ATTACK_SPEED]: 'Attack Speed',
  [ATTACK_SPEED + '-description']: (amount) => `Increases your attack speed by ${amount} %`,
  [DOUBLE_DAMAGE_CHANCE]: 'Double Damage Chance',
  [DOUBLE_DAMAGE_CHANCE + '-description']: (amount) => `Increases your chance to deal double damage by ${amount}`,

  // Defense
  [BONUS_HEALTH]: 'Bonus Health',
  [BONUS_HEALTH + '-description']: (amount) => `Increases your health by ${amount}`,
  level: 'Level',
  rank: 'Rank',
  totalHealth: 'Total Health',
  totalMana: 'Total Mana',
  health: 'Health',
  mana: 'Mana',
  damage: 'Damage',
  attack: 'Attack',
  heal: 'Heal',
  'double-damage': 'Double damage',
  'auto-cast': 'Auto cast',
  backstab: 'Backstab',
  attackSpeed: 'Attack speed',
  critChance: 'Critical strike chance',
  critDamage: 'Critical strike damage',
  doubleDamageChance: 'Double damage chance',

  // Misc
  resetProgress: 'Reset Progress',
  logout: 'Logout',
};

export const es = {};

export const translations = {
  en,
  es,
};
