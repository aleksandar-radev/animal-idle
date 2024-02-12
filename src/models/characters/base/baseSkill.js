import { CURRENCY_CRYSTAL, CURRENCY_GOLD } from '../../../constants/gameVariables';

const BaseSkill = (store, data) => {
  const values = {
    manaCost: 0,
    passive: true,
    ...data,
    // add complex objects below this line
    cost: {
      [CURRENCY_GOLD]: {
        type: CURRENCY_GOLD,
        multiplier: 0,
        ...data.cost?.gold,
      },
      [CURRENCY_CRYSTAL]: {
        type: CURRENCY_CRYSTAL,
        multiplier: 0,
        ...data.cost?.crystal,
      },
    },
    requirements: {
      level: 1,
      ...data.requirements,
    },
  };

  return {
    ...values,
    isActive() {
      return !this.passive;
    },
    isPassive() {
      return this.passive;
    },
    getName() {
      return this.name;
    },
    getType() {
      return this.type;
    },
    getLevel() {
      return this.persistentData.level;
    },
    getImgUrl() {
      return this.icon;
    },
    getBonus() {
      return this.persistentData.level * 1;
    },
    getCost(x = 1) {
      return {
        [CURRENCY_GOLD]: this.getCostByType(CURRENCY_GOLD, x),
        [CURRENCY_CRYSTAL]: this.getCostByType(CURRENCY_CRYSTAL, x),
      };
    },
    // X is how many times you want to get cost. e.g. how many times you want to buy the skill
    getCostByType(type, x = 1) {
      const costMultiplier = this.cost[type].multiplier;
      if (costMultiplier === 0) {
        return 0;
      }
      const a1 = Math.floor((1 + this.persistentData.level) * costMultiplier);
      const an = Math.floor((1 + this.persistentData.level + x - 1) * costMultiplier);
      const Sn = Math.ceil((x * (a1 + an)) / 2);
      return Sn;
    },
    getRequirements() {
      return this.requirements;
    },
    getLevelRequired() {
      return this.requirements.level;
    },
  };
};

export default BaseSkill;
