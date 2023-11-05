import {
  SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT,
  SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT,
  SHOP_UPGRADES_ATTACK_BONUS_SPEED,
  SHOP_UPGRADES_ATTACK_CRIT_CHANCE,
  SHOP_UPGRADES_ATTACK_CRIT_DAMAGE,
  SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE,
  SHOP_UPGRADES_DEFENSE_BONUS_HEALTH,
} from './gameVariables';

export const en = {
  // Attack
  [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT]: 'Bonus Flat Damage',
  [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT + '-description']: (amount) => `Increases your damage by ${amount}`,
  [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT]: 'Bonus % Damage',
  [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT + '-description']: (amount) => `Increases your damage by ${amount} %`,
  [SHOP_UPGRADES_ATTACK_CRIT_CHANCE]: 'Chance to crit',
  [SHOP_UPGRADES_ATTACK_CRIT_CHANCE + '-description']: (amount) => `Increases your chance to crit by ${amount} %`,
  [SHOP_UPGRADES_ATTACK_CRIT_DAMAGE]: 'Chance crit damage',
  [SHOP_UPGRADES_ATTACK_CRIT_DAMAGE + '-description']: (amount) => `Increases your critical damage by ${amount} %`,
  [SHOP_UPGRADES_ATTACK_BONUS_SPEED]: 'Attack Speed',
  [SHOP_UPGRADES_ATTACK_BONUS_SPEED + '-description']: (amount) => `Increases your attack speed by ${amount} %`,
  [SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE]: 'Double Damage Chance',
  [SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE + '-description']: (amount) =>
    `Increases your chance to deal double damage by ${amount}`,

  // Defense
  [SHOP_UPGRADES_DEFENSE_BONUS_HEALTH]: 'Bonus Health',
  [SHOP_UPGRADES_DEFENSE_BONUS_HEALTH + '-description']: (amount) => `Increases your health by ${amount}`,
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
