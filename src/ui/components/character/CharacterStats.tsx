import './CharacterStats.scss';
import useTranslations from '@/hooks/general/useTranslations';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';

const CharacterStats = () => {
  const cm = useCharacterMethods();
  const t = useTranslations();
  const stats = cm.getAllStatsOfActiveCharacter();

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