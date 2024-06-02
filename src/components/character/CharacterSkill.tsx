import React, { useState } from 'react';
import './CharacterSkill.scss';
import { Popper } from '@mui/material';
import useTranslations from '../../hooks/useTranslations';

const CharacterSkill = ({ className, skill, x }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const t = useTranslations();
  const open = Boolean(anchorEl);
  const id = open ? 'skill-popper' : undefined;

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const buySkill = () => {
    // charSkills.buySkill(skill);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={buySkill}
      className={['CharacterSkill', className].join(' ')}>
      <img src={skill.icon} alt={skill.name} />
      <Popper id={id} open={open} anchorEl={anchorEl} placement="top" className="CharacterSkill-tooltip">
        <div className="tooltip">
          <div>
            {t['level']}: {skill.level} {' -> '} {skill.level + x}
          </div>
          <div>
            Cost:{' '}
            {Object.entries(skill.cost).map(([currency, value]) => {
              return (
                <div key={currency}>
                  {currency} {value}
                </div>
              );
            })}
          </div>
          <div>{skill.passive ? 'passive' : 'active'}</div>
          <div>{skill.name}</div>
        </div>
      </Popper>
    </div>
  );
};

export default CharacterSkill;
