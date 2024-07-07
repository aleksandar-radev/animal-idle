import './CharacterScreenMenu.scss';
import useStore from '../../hooks/useStore';
import useTranslations from '../../hooks/useTranslations';
import Settings from '../../models/Settings';

const CharacterScreenMenu = () => {
  const { data, settings } = useStore();
  const t = useTranslations();

  const changeView = (view) => {
    settings.activeCharacterScreenTab = view;
  };

  const handleBack = (view) => {
    settings.activeCharacter = null;
    settings.activeMainScreenTab = view;
  };

  const isActiveTab = (tab) => {
    return settings.activeCharacterScreenTab === tab;
  };

  return (
    <div className={'CharacterScreenMenu'}>
      <div onClick={() => handleBack(Settings.MAIN_SCREEN_CHARACTER_TAB)}>{t['back']}</div>
      <div
        className={isActiveTab(Settings.CHARACTER_SCREEN_STATS_TAB) ? 'active' : ''}
        onClick={() => changeView(Settings.CHARACTER_SCREEN_STATS_TAB)}>
        {t['stats']}
      </div>
      <div
        className={isActiveTab(Settings.CHARACTER_SCREEN_SKILLS_TAB) ? 'active' : ''}
        onClick={() => changeView(Settings.CHARACTER_SCREEN_SKILLS_TAB)}>
        {t['skills']}
      </div>
      <div
        className={isActiveTab(Settings.CHARACTER_SCREEN_ITEMS_TAB) ? 'active' : ''}
        onClick={() => changeView(Settings.CHARACTER_SCREEN_ITEMS_TAB)}>
        {t['items']}
      </div>
    </div>
  );
};

export default CharacterScreenMenu;
