import './CharacterStats.scss';
import useTranslations from '../../hooks/useTranslations';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';

const CharacterStats = () => {
  const { store } = useStore();
  const { getActiveCharacter } = useCharacterMethods();
  const stats = getActiveCharacter().getAllStats();

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
