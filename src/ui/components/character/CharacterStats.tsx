import './CharacterStats.scss';
import useTranslations from '@/hooks/general/useTranslations';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import { useState } from 'react';
import { LinearProgress, Popper } from '@mui/material';

const CharacterStats = () => {
  const cm = useCharacterMethods();
  const t = useTranslations();
  const stats = cm.getAllStatsOfActiveCharacter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const renderName = (stat) => {
    const activeCharacter = cm.getActiveCharacter();
    return (
      <div className="name" key={stat}>
        {activeCharacter.name}
      </div>
    );
  };

  const renderLevel = (stat) => {
    const activeCharacter = cm.getActiveCharacter();
    const requiredExp = cm.requiredExperienceForNextLevel(activeCharacter.type);
    const progress = activeCharacter.currentExperience / requiredExp;

    return (
      <div className="level" key={stat}>
        <div className="current">{activeCharacter.level}</div>
        <div className="progress" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <LinearProgress className="line" variant="determinate" value={progress * 100} />
          <div className="percentage">{`${progress}%`}</div>
        </div>
        <div className="next">{activeCharacter.level + 1}</div>
        <Popper open={open} anchorEl={anchorEl} placement="top" className="CharacterStats-tooltip">
          <div className="progress">{`${activeCharacter.currentExperience} / ${requiredExp}`}</div>
        </Popper>
      </div>
    );
  };

  return (
    <div className="CharacterStats">
      <div className="left panel">
        {Object.keys(stats).map((stat) => {
          if (stat === 'name') {
            return renderName(stat);
          }
          if (stat === 'level') {
            return renderLevel(stat);
          }

          return (
            <div className="stat" key={stat}>
              <div className="label">{t[stat]}</div>
              <div className="value">{stats[stat]}</div>
            </div>
          );
        })}
      </div>
      <div className="right panel">To be added later...</div>
    </div>
  );
};

export default CharacterStats;
