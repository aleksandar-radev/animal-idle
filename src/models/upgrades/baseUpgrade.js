import { CURRENCY_GOLD } from '../../constants/gameVariables';

const BaseUpgrade = (store, data) => {
  return {
    level: data.level,
    getImgUrl: function () {
      return data.icon;
    },
    getBonus: function () {
      return this.level * 1;
    },
    getCost: function () {
      return this.level * 10 + 5;
    },
    buy: function () {
      const gold = store.data.currencies[CURRENCY_GOLD];
      const cost = this.getCost();
      if (cost > gold.value) {
        return;
      }

      store.data.currencies[CURRENCY_GOLD].remove(cost);
      this.level++;
      store.data.renderChange();
    },
  };
};

export default BaseUpgrade;
