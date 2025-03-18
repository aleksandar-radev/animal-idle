import './MainScreen.scss';
import CharacterScreen from '@/ui/screens/character/CharacterScreen';
import FightScreen from '@/ui/screens/fight/FightScreen';
import ShopScreen from '@/ui/screens/shop/ShopScreen';
import LeaderboardScreen from '@/ui/screens/leaderboard/LeaderboardScreen';
import AdminScreen from '@/ui/screens/admin/AdminScreen';
import SettingsScreen from '@/ui/screens/settings/SettingsScreen';
import useGameStore from '@/hooks/general/useGameStore';
import Settings from '@/models/Settings';
import DocsScreen from '@/ui/screens/docs/DocsScreen';

const MainScreen = () => {
  const { settings } = useGameStore();

  const activeTab = () => {
    switch (settings.activeMainScreenTab) {
      case Settings.MAIN_SCREEN_FIGHT_TAB:
        return <FightScreen />;
      case Settings.MAIN_SCREEN_SHOP_TAB:
        return <ShopScreen />;
      case Settings.MAIN_SCREEN_CHARACTER_TAB:
        return <CharacterScreen />;
      case Settings.MAIN_SCREEN_LEADERBOARD_TAB:
        return <LeaderboardScreen />;
      case Settings.MAIN_SCREEN_SETTINGS_TAB:
        return <SettingsScreen />;
      case Settings.MAIN_SCREEN_ADMIN_TAB:
        return <AdminScreen />;
      case Settings.MAIN_SCREEN_DOCS_TAB:
        return <DocsScreen />;
      default:
        return '';
    }
  };

  return <div className={'MainScreen'}>{activeTab()}</div>;
};

export default MainScreen;
