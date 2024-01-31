import './CharacterStats.scss';
import useTranslations from '../../hooks/useTranslations';
import useStore from '../../hooks/useStore';

const CharacterStats = () => {
  const { store } = useStore();
  const stats = store.characters[store.settings.activeCharacter].getAllStats();
  const t = useTranslations();

  return (
    <div className="CharacterStats">
      <div className="left panel">
        {Object.keys(stats).map((stat) => {
          return (
            <div className="stat" key={stat}>
              <div className="label">{t[stat]}</div>
              <div className="value">{stats[stat]}</div>
            </div>
          );
        })}
      </div>
      <div className="right panel"></div>
    </div>
  );
};

export default CharacterStats;
