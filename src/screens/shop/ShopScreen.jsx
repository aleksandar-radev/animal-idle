import { useContext } from 'react';
import { State } from '../../api/Store';
import ShopUpgradesAttack from '../../components/shop/ShopUpgradesAttack';
import ShopUpgradesDefense from '../../components/shop/ShopUpgradesDefense';
import ShopUpgradesUtility from '../../components/shop/ShopUpgradesUtility';
import {
  SHOP_SCREEN_ATTACK_TAB,
  SHOP_SCREEN_DEFENSE_TAB,
  SHOP_SCREEN_UTILITY_TAB,
} from '../../constants/gameVariables';
import './ShopScreen.scss';

const Shop = () => {
  const [store] = useContext(State);

  const changeView = (view) => {
    store.tabs.setActiveShopScreenTab(view);
  };

  const activeTab = () => {
    switch (store?.tabs?.activeShopScreenTab) {
      case SHOP_SCREEN_ATTACK_TAB:
        return <ShopUpgradesAttack />;
      case SHOP_SCREEN_DEFENSE_TAB:
        return <ShopUpgradesDefense />;
      case SHOP_SCREEN_UTILITY_TAB:
        return <ShopUpgradesUtility />;
      default:
        return <ShopUpgradesAttack />;
    }
  };

  const isActiveTab = (tab) => {
    return store?.tabs?.activeShopScreenTab === tab;
  };

  return (
    <div className="ShopScreen">
      <div className="tabs">
        <div
          className={`tab ${isActiveTab(SHOP_SCREEN_ATTACK_TAB) && 'active'}`}
          onClick={() => changeView(SHOP_SCREEN_ATTACK_TAB)}>
          Attack
        </div>
        <div
          className={`tab ${isActiveTab(SHOP_SCREEN_DEFENSE_TAB) && 'active'}`}
          onClick={() => changeView(SHOP_SCREEN_DEFENSE_TAB)}>
          Defense
        </div>
        <div
          className={`tab ${isActiveTab(SHOP_SCREEN_UTILITY_TAB) && 'active'}`}
          onClick={() => changeView(SHOP_SCREEN_UTILITY_TAB)}>
          Utility
        </div>
      </div>

      <div className="upgrades">{activeTab()}</div>
    </div>
  );
};

export default Shop;
