import ShopSkillsAttack from '../../components/shop/ShopSkillsAttack';
import ShopSkillsDefense from '../../components/shop/ShopSkillsDefense';
import ShopSkillsUtility from '../../components/shop/ShopSkillsUtility';
import './ShopScreen.scss';
import useStore from '../../hooks/useStore';
import Settings from '../../models/Settings';

const ShopScreen = () => {
  const { settings } = useStore();

  const changeView = (view: string) => {
    settings.activeShopScreenTab = view;
  };

  const activeTab = () => {
    switch (settings.activeShopScreenTab) {
      case Settings.SHOP_SCREEN_ATTACK_TAB:
        return <ShopSkillsAttack />;
      case Settings.SHOP_SCREEN_DEFENSE_TAB:
        return <ShopSkillsDefense />;
      case Settings.SHOP_SCREEN_UTILITY_TAB:
        return <ShopSkillsUtility />;
      default:
        return '';
    }
  };

  const isActiveTab = (tab) => {
    return settings.activeShopScreenTab === tab;
  };

  return (
    <div className="ShopScreen">
      <div className="tabs">
        <div
          className={`tab ${isActiveTab(Settings.SHOP_SCREEN_ATTACK_TAB) && 'active'}`}
          onClick={() => changeView(Settings.SHOP_SCREEN_ATTACK_TAB)}>
          Attack
        </div>
        <div
          className={`tab ${isActiveTab(Settings.SHOP_SCREEN_DEFENSE_TAB) && 'active'}`}
          onClick={() => changeView(Settings.SHOP_SCREEN_DEFENSE_TAB)}>
          Defense
        </div>
        <div
          className={`tab ${isActiveTab(Settings.SHOP_SCREEN_UTILITY_TAB) && 'active'}`}
          onClick={() => changeView(Settings.SHOP_SCREEN_UTILITY_TAB)}>
          Utility
        </div>
      </div>

      <div className="skills">{activeTab()}</div>
    </div>
  );
};

export default ShopScreen;
