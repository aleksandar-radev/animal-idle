import { CHARACTER_SCREEN_STATS_TAB, MAIN_SCREEN_FIGHT_TAB } from "../constants/tabs";

// eslint-disable-next-line no-unused-vars
const Tabs = (store) => {

  return {
    activeMainScreenTab: MAIN_SCREEN_FIGHT_TAB,
    activeCharacterScreenTab: CHARACTER_SCREEN_STATS_TAB,
    setActiveMainScreenTab (tab) {
      this.activeMainScreenTab = tab;
    },
    setActiveCharacterScreenTab (tab) {
      this.activeCharacterScreenTab = tab;
    },
  };
};

export default Tabs;
