import './ShopScreen.scss';
import useStore from '@/hooks/useStore';
import Settings from '@/models/Settings';
import useTranslations from '@/hooks/useTranslations';
import ShopCharacters from '@/ui/components/shop/ShopCharacters';
import ShopUtility from '@/ui/components/shop/ShopUtility';
import ShopDecksList from '@/ui/components/shop/ShopDecksList';

const ShopScreen = () => {
  const { settings } = useStore();
  const t = useTranslations();

  const changeView = (view: string) => {
    settings.activeShopScreenTab = view;
  };

  const activeTab = () => {
    switch (settings.activeShopScreenTab) {
      case Settings.SHOP_SCREEN_CHARACTERS_TAB:
        return <ShopCharacters />;
      case Settings.SHOP_SCREEN_DECKS_TAB:
        return <ShopDecksList />;
      case Settings.SHOP_SCREEN_UTILITY_TAB:
        return <ShopUtility />;
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
          className={`tab ${isActiveTab(Settings.SHOP_SCREEN_CHARACTERS_TAB) && 'active'}`}
          onClick={() => changeView(Settings.SHOP_SCREEN_CHARACTERS_TAB)}>
          {t['characters']}
        </div>
        <div
          className={`tab ${isActiveTab(Settings.SHOP_SCREEN_DECKS_TAB) && 'active'}`}
          onClick={() => changeView(Settings.SHOP_SCREEN_DECKS_TAB)}>
          {t['decks']}
        </div>
        <div
          className={`tab ${isActiveTab(Settings.SHOP_SCREEN_UTILITY_TAB) && 'active'}`}
          onClick={() => changeView(Settings.SHOP_SCREEN_UTILITY_TAB)}>
          {t['utility']}
        </div>
      </div>

      <div className="shop-tab">{activeTab()}</div>
    </div>
  );
};

export default ShopScreen;
