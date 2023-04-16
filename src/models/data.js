import {
  CHARACTER_CURRENCY_GOLD,
  CHARACTER_SKILL_ATACK,
  CHARACTER_SKILL_DOUBLE_DAMAGE,
  CHARACTER_SKILL_HEAL,
} from '../constants/gameVariables';

const Data = () => {
  return {
    character: {
      bonusHealthFlat: 20,
      bonusHealthPercent: 1,

      bonusManaFlat: 20,
      bonusManaPercent: 1,

      bonusDamageFlat: 1,
      bonusDamagePercent: 1,
    },

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
  };
};

export default Data;
