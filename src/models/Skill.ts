import { CURRENCY_CRYSTAL, CURRENCY_GOLD } from '../helpers/constants/gameVariables';

class Skill {
  name: number;
  type: number;
  index: number;
  level: number;
  manaCost: number;
  passive: boolean;
  icon: any;
  requirements: any;
  cost: any;

  constructor({ name, type, index, level, manaCost = 0, passive = true, icon = '', requirements = {}, cost = {} }) {
    this.name = name;
    this.type = type;
    this.index = index;
    this.level = level;
    this.manaCost = manaCost;
    this.passive = passive;
    this.icon = icon;
    this.requirements = requirements;
    this.cost = cost;

    // this.cost = {
    //   [CURRENCY_GOLD]: {
    //     type: CURRENCY_GOLD,
    //     multiplier: 0,
    //     ...data.cost?.gold,
    //   },
    //   [CURRENCY_CRYSTAL]: {
    //     type: CURRENCY_CRYSTAL,
    //     multiplier: 0,
    //     ...data.cost?.crystal,
    //   },
    // };
    // this.requirements = {
    //   level: 1,
    //   ...data.requirements,
    // };
  }

  isActive() {
    return !this.passive;
  }

  isPassive() {
    return this.passive;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  getLevel() {
    return this.level;
  }

  getImgUrl() {
    return this.icon;
  }

  getBonus() {
    return this.level * 1;
  }

  getCost(x = 1) {
    return {
      [CURRENCY_GOLD]: this.getCostByType(CURRENCY_GOLD, x),
      [CURRENCY_CRYSTAL]: this.getCostByType(CURRENCY_CRYSTAL, x),
    };
  }

  // X is how many times you want to get cost. e.g. how many times you want to buy the skill
  getCostByType(type, x = 1) {
    const costMultiplier = this.cost[type].multiplier;
    if (costMultiplier === 0) {
      return 0;
    }
    const a1 = Math.floor((1 + this.level) * costMultiplier);
    const an = Math.floor((1 + this.level + x - 1) * costMultiplier);
    const Sn = Math.ceil((x * (a1 + an)) / 2);
    return Sn;
  }

  getRequirements() {
    return this.requirements;
  }

  getLevelRequired() {
    return this.requirements.level;
  }
}

export default Skill;
