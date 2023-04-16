import {
  SHOP_UPGRADES_ATACK,
  SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT,
} from '../constants/gameVariables';

export const upgrades = {
  [SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT]: {
    getBonus: (level = 0) => level * 1,
    getCost: (level = 0) => level * 10 + 5,
    buy: function (store) {
      const upgrade =
        store.data.upgrades[SHOP_UPGRADES_ATACK][SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT];

      const cost = this.getCost(upgrade.level);

      if (cost > store.data.currencies.gold) {
        return;
      }

      store.data.currencies.gold -= cost;
      upgrade.level++;
    },
  },
};
