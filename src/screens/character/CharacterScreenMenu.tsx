import {
  CHARACTER_SCREEN_ITEMS_TAB,
  CHARACTER_SCREEN_SKILLS_TAB,
  CHARACTER_SCREEN_STATS_TAB,
  MAIN_SCREEN_CHARACTER_TAB,
} from '../../helpers/constants/gameVariables';
import './CharacterScreenMenu.scss';
import useStore from '../../hooks/useStore';
import useTranslations from '../../hooks/useTranslations';

const CharacterScreenMenu = () => {
  const { data, settings } = useStore();
  const t = useTranslations();

  const changeView = (view) => {
    settings.setActiveCharacterScreenTab(view);
  };

  const handleBack = (view) => {
    settings.setActiveCharacter(null);
    settings.setActiveMainScreenTab(view);
  };

  const isActiveTab = (tab) => {
    return settings.activeCharacterScreenTab === tab;
  };

  return (
    <div className={'CharacterScreenMenu'}>
      <div onClick={() => handleBack(MAIN_SCREEN_CHARACTER_TAB)}>Back</div>
      <div
        className={isActiveTab(CHARACTER_SCREEN_STATS_TAB) ? 'active' : ''}
        onClick={() => changeView(CHARACTER_SCREEN_STATS_TAB)}>
        {t['stats']}
      </div>
      <div
        className={isActiveTab(CHARACTER_SCREEN_SKILLS_TAB) ? 'active' : ''}
        onClick={() => changeView(CHARACTER_SCREEN_SKILLS_TAB)}>
        {t['skills']}
      </div>
      <div
        className={isActiveTab(CHARACTER_SCREEN_ITEMS_TAB) ? 'active' : ''}
        onClick={() => changeView(CHARACTER_SCREEN_ITEMS_TAB)}>
        {t['items']}
      </div>
    </div>
  );
};

export default CharacterScreenMenu;
