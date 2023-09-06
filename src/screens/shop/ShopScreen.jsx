import { useContext } from 'react';
import { State } from '../../api/Store';
import ShopUpgradesAttack from '../../components/shop/ShopUpgradesAttack';
import ShopUpgradesDefence from '../../components/shop/ShopUpgradesDefence';
import ShopUpgradesUtility from '../../components/shop/ShopUpgradesUtility';
import {
  SHOP_SCREEN_ATTACK_TAB,
  SHOP_SCREEN_DEFENCE_TAB,
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
      case SHOP_SCREEN_DEFENCE_TAB:
        return <ShopUpgradesDefence />;
      case SHOP_SCREEN_UTILITY_TAB:
        return <ShopUpgradesUtility />;
      default:
        return <ShopUpgradesAttack />;
    }
  };

  return (
    <div className="ShopScreen">
      <div className="ShopScreen-tabs">
        <div className="ShopScreen-tabs-tab" onClick={() => changeView(SHOP_SCREEN_ATTACK_TAB)}>
          Attack
        </div>
        <div className="ShopScreen-tabs-tab" onClick={() => changeView(SHOP_SCREEN_DEFENCE_TAB)}>
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
