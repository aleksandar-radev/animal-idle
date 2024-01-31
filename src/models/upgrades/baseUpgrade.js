import { CURRENCY_GOLD } from '../../constants/gameVariables';

const BaseUpgrade = (store, data) => {
  return {
    persistentData: data.persistentData,
    getLevel() {},
    getImgUrl() {
      return data.icon;
    },
    getBonus() {
      return this.persistentData.level * 1;
    },
    getCost() {
      return this.persistentData.level * 10 + 5;
    },
    // TODO: remove, add to useCharacterUpgrades();
    buy() {
      const gold = store.data.currencies[CURRENCY_GOLD];
      const cost = this.getCost();
      if (cost > gold.value) {
        return;
      }

      store.data.currencies[CURRENCY_GOLD].remove(cost);
      this.persistentData.level++;
      store.data.renderChange();
    },
  };
};

export default BaseUpgrade;
