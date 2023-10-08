import {
  CHARACTER_SCREEN_STATS_TAB,
  MAIN_SCREEN_CHARACTER_TAB,
  SHOP_SCREEN_ATTACK_TAB,
} from '../constants/gameVariables';

// eslint-disable-next-line no-unused-vars
const Settings = (store) => {
  return {
    activeMainScreenTab: MAIN_SCREEN_CHARACTER_TAB,
    activeCharacterScreenTab: CHARACTER_SCREEN_STATS_TAB,
    activeShopScreenTab: SHOP_SCREEN_ATTACK_TAB,
    activeCharacter: null,

    setActiveMainScreenTab(tab) {
      this.activeMainScreenTab = tab;
    },

    setActiveCharacterScreenTab(tab) {
      this.activeCharacterScreenTab = tab;
    },

    setActiveShopScreenTab(tab) {
      this.activeShopScreenTab = tab;
    },

    setActiveCharacter(character) {
      this.activeCharacter = character;
    },
  };
};

export default Settings;
