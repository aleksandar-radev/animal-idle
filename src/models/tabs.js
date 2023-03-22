import { CHARACTER_SCREEN_STATS_TAB, MAIN_SCREEN_FIGHT_TAB } from "../constants/tabs";


const tabs = {
  activeMainScreenTab: MAIN_SCREEN_FIGHT_TAB,
  activeCharacterScreenTab: CHARACTER_SCREEN_STATS_TAB,
  setActiveMainScreenTab (tab) {
    this.activeMainScreenTab = tab;
  },
  setActiveCharacterScreenTab (tab) {
    this.activeCharacterScreenTab = tab;
  },
}

export default tabs;
