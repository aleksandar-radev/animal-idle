import {
  SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT,
  SHOP_UPGRADES_ATTACK_BONUS_SPEED,
} from './gameVariables';

export const en = {
  [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT]: 'Bonus Flat Damage',
  [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT + '-description']: (amount) =>
    `Increases your damage by ${amount}`,
  [SHOP_UPGRADES_ATTACK_BONUS_SPEED]: 'Attack Speed',
  [SHOP_UPGRADES_ATTACK_BONUS_SPEED + '-description']: (amount) =>
    `Increases your speed by ${amount}`,
  rank: 'Rank',
};

export const es = {};

export const translations = {
  en,
  es,
};
