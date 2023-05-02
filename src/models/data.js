import {
  CHARACTER_CURRENCY_GOLD,
  CHARACTER_SKILL_ATACK,
  CHARACTER_SKILL_AUTO_CAST,
  CHARACTER_SKILL_DOUBLE_DAMAGE,
  CHARACTER_SKILL_HEAL,
  SHOP_UPGRADES_ATACK,
  SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT,
} from '../constants/gameVariables';

const Data = (store) => {
  return {
    character: {},
    enemy: {
      level: 0,
    },
    renderChanges: 0,
    renderChange() {
      this.renderChanges++;
      if (this.renderChanges > 1e99) {
        this.renderChanges = 0;
      }
    },

    currencies: {
      [CHARACTER_CURRENCY_GOLD]: {
        value: 0,
        add: function (amount) {
          if (isNaN(amount)) {
            return;
          }

          this.value += +amount;
        },
        remove: function (amount) {
          if (isNaN(amount)) {
            return;
          }
          this.value -= +amount;
        },
      },
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
      [CHARACTER_SKILL_AUTO_CAST]: {
        name: CHARACTER_SKILL_AUTO_CAST,
        cooldownReductionFlat: 0,
      },
      map: {
        1: CHARACTER_SKILL_ATACK,
        2: CHARACTER_SKILL_HEAL,
        3: CHARACTER_SKILL_DOUBLE_DAMAGE,
        4: CHARACTER_SKILL_AUTO_CAST,
      },
    },

    upgrades: {
      [SHOP_UPGRADES_ATACK]: {
        [SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT]: {
          level: 0,
          getBonus: function () {
            return this.level * 1;
          },
          getCost: function () {
            return this.level * 10 + 5;
          },
          buy: function () {
            const gold = store.data.currencies[CHARACTER_CURRENCY_GOLD];
            const cost = this.getCost();
            store.data.renderChange();

            if (cost > gold.value) {
              return;
            }

            store.data.currencies[CHARACTER_CURRENCY_GOLD].remove(cost);
            this.level++;
          },
        },
      },
    },
  };
};

export default Data;