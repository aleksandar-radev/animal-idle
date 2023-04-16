import {
  CHARACTER_CURRENCY_GOLD,
  CHARACTER_SKILL_ATACK,
  CHARACTER_SKILL_DOUBLE_DAMAGE,
  CHARACTER_SKILL_HEAL,
  SHOP_UPGRADES_ATACK,
  SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT,
} from '../constants/gameVariables';

const Data = () => {
  return {
    character: {},

    currencies: {
      [CHARACTER_CURRENCY_GOLD]: 1,
    },

    skills: {
      [CHARACTER_SKILL_ATACK]: {
        name: CHARACTER_SKILL_ATACK,
        cooldownReductionFlat: 0,
      },
      [CHARACTER_SKILL_HEAL]: {
        name: CHARACTER_SKILL_HEAL,
        cooldownReductionFlat: 0,
      },
      [CHARACTER_SKILL_DOUBLE_DAMAGE]: {
        name: CHARACTER_SKILL_DOUBLE_DAMAGE,
        cooldownReductionFlat: 0,
      },
      map: {
        1: CHARACTER_SKILL_ATACK,
        2: CHARACTER_SKILL_HEAL,
        3: CHARACTER_SKILL_DOUBLE_DAMAGE,
      },
    },

    upgrades: {
      [SHOP_UPGRADES_ATACK]: {
        [SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT]: {
          level: 0,
        },
      },
    },
  };
};

export default Data;
