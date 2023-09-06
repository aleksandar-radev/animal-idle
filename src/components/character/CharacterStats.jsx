import { useContext } from 'react';
import { State } from '../../api/Store';
import './CharacterStats.scss';
import useTranslations from '../../hooks/useTranslations';

const CharacterStats = () => {
  const [store] = useContext(State);
  const stats = store.character.getAllStats();
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
