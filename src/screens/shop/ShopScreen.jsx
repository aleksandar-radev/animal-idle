import React, { useContext } from 'react';
import { State } from '../../api/Store';
import ShopUpgradesAtack from '../../components/ShopUpgradesAtack';
import {
  SHOP_SCREEN_ATACK_TAB,
  SHOP_SCREEN_DEFENSE_TAB,
  SHOP_SCREEN_UTILITY_TAB,
} from '../../constants/gameVariables';
import './ShopScreen.scss';

const Shop = () => {
  const [store] = useContext(State);

  const changeView = (view) => {
    store.tabs.setActiveCharacterScreenTab(view);
  };

  const activeTab = () => {
    switch (store?.tabs?.activeCharacterScreenTab) {
      case SHOP_SCREEN_ATACK_TAB:
        return <ShopUpgradesAtack />;
      case SHOP_SCREEN_DEFENSE_TAB:
        return '';
      case SHOP_SCREEN_UTILITY_TAB:
        return '';
      default:
        return <ShopUpgradesAtack />;
    }
  };

  return (
    <div className="ShopScreen">
      <div className="ShopScreen-tabs">
        <div className="ShopScreen-tabs-tab" onClick={() => changeView(SHOP_SCREEN_ATACK_TAB)}>
          Atack
        </div>
        <div className="ShopScreen-tabs-tab" onClick={() => changeView(SHOP_SCREEN_DEFENSE_TAB)}>
          Defence
        </div>
        <div className="ShopScreen-tabs-tab" onClick={() => changeView(SHOP_SCREEN_UTILITY_TAB)}>
          Utility
        </div>
      </div>

      <div className="ShopScreen-upgrades">{activeTab()}</div>
    </div>
  );
};

export default Shop;
