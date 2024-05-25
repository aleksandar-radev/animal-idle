import {
  CHARACTER_SCREEN_STATS_TAB,
  MAIN_SCREEN_CHARACTER_TAB,
  SHOP_SCREEN_ATTACK_TAB,
} from '../helpers/constants/gameVariables';

// eslint-disable-next-line no-unused-vars
class Settings {
  activeMainScreenTab: string;
  activeCharacterScreenTab: string;
  activeShopScreenTab: string;
  activeCharacter: any;
  areCharactersDraggable: boolean;
  isFightStarted: boolean;

  constructor({ }) {
    this.activeMainScreenTab = MAIN_SCREEN_CHARACTER_TAB;
    this.activeCharacterScreenTab = CHARACTER_SCREEN_STATS_TAB;
    this.activeShopScreenTab = SHOP_SCREEN_ATTACK_TAB;
    this.activeCharacter = null;
    this.areCharactersDraggable = false;
    this.isFightStarted = false;
  }

  setActiveMainScreenTab(tab) {
    this.activeMainScreenTab = tab;
  }

  setActiveCharacterScreenTab(tab) {
    this.activeCharacterScreenTab = tab;
  }

  setActiveShopScreenTab(tab) {
    this.activeShopScreenTab = tab;
  }

  setActiveCharacter(character) {
    this.activeCharacter = character;
  }
}

export default Settings;
