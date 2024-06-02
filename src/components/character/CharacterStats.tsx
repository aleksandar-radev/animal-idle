import './CharacterStats.scss';
import useTranslations from '../../hooks/useTranslations';
import useCharacterMethods from '../../hooks/useCharacterMethods';

const CharacterStats = () => {
  const cm = useCharacterMethods();
  const stats = cm.getAllStatsOfActiveCharacter();
  console.log(stats);

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
