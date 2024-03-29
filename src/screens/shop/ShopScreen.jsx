import ShopSkillsAttack from '../../components/shop/ShopSkillsAttack';
import ShopSkillsDefense from '../../components/shop/ShopSkillsDefense';
import ShopSkillsUtility from '../../components/shop/ShopSkillsUtility';
import {
  SHOP_SCREEN_ATTACK_TAB,
  SHOP_SCREEN_DEFENSE_TAB,
  SHOP_SCREEN_UTILITY_TAB,
} from '../../constants/gameVariables';
import './ShopScreen.scss';
import useStore from '../../hooks/useStore';

const ShopScreen = () => {
  const { store } = useStore();

  const changeView = (view) => {
    store.settings.setActiveShopScreenTab(view);
  };

  const activeTab = () => {
    switch (store?.settings?.activeShopScreenTab) {
      case SHOP_SCREEN_ATTACK_TAB:
        return <ShopSkillsAttack />;
      case SHOP_SCREEN_DEFENSE_TAB:
        return <ShopSkillsDefense />;
      case SHOP_SCREEN_UTILITY_TAB:
        return <ShopSkillsUtility />;
      default:
        return <ShopSkillsAttack />;
    }
  };

  const isActiveTab = (tab) => {
    return store?.settings?.activeShopScreenTab === tab;
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

      <div className="skills">{activeTab()}</div>
    </div>
  );
};

export default ShopScreen;
