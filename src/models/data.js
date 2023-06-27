import swingIcon from '../assets/swing.png';
import swordIcon from '../assets/sword.png';
import {
  CHARACTER_CURRENCY_GOLD,
  CHARACTER_SKILL_ATACK,
  CHARACTER_SKILL_AUTO_CAST,
  CHARACTER_SKILL_ASCEND,
  CHARACTER_SKILL_BACKSTAB,
  CHARACTER_SKILL_DOUBLE_DAMAGE,
  CHARACTER_SKILL_HEAL,
  SHOP_UPGRADES_ATACK,
  SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT,
  SHOP_UPGRADES_ATACK_BONUS_SPEED,
  SHOP_UPGRADES_DEFENCE_BONUS_HEALTH,
  SHOP_UPGRADES_DEFENCE,
} from '../constants/gameVariables';

const Data = (store) => {
  return {
    character: {},
    enemy: {
      level: 0,
    },
    renderChanges: 0,
    renderChange () {
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
      [CHARACTER_SKILL_BACKSTAB]: {
        name: CHARACTER_SKILL_BACKSTAB,
        cooldownReductionFlat: 0,
      },
      [CHARACTER_SKILL_ASCEND]: {
        name: CHARACTER_SKILL_ASCEND,
        cooldownReductionFlat: 0,
      },
      map: {
        1: CHARACTER_SKILL_ATACK,
        2: CHARACTER_SKILL_HEAL,
        3: CHARACTER_SKILL_DOUBLE_DAMAGE,
        4: CHARACTER_SKILL_AUTO_CAST,
        5: CHARACTER_SKILL_BACKSTAB,
        6: CHARACTER_SKILL_ASCEND,
      },
    },

    upgrades: {
      [SHOP_UPGRADES_ATACK]: {
        [SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT]: {
          level: 0,
          getImgUrl: function () {
            return swordIcon;
          },
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

        [SHOP_UPGRADES_ATACK_BONUS_SPEED]: {
          level: 0,
          getImgUrl: function () {
            return swingIcon;
          },
          getBonus: function () {
            return this.level * 1;
          },
          getCost: function () {
            return this.level * 10 + 10;
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

      [SHOP_UPGRADES_DEFENCE]: {
        [SHOP_UPGRADES_DEFENCE_BONUS_HEALTH]: {
          level: 0,
          getImgUrl: function () {
            return swordIcon;
          },
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
