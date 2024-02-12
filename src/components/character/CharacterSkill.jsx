import React, { useState } from 'react';
import './CharacterSkill.scss';
import PropTypes from '../../externalLibraries/propTypes';
import { Popper } from '@mui/material';
import useCharactersSkills from '../../hooks/useCharactersSkills';
import useTranslations from '../../hooks/useTranslations';

const CharacterSkill = ({ className, skill, x }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const charSkills = useCharactersSkills();
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
    charSkills.buySkill(skill);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={buySkill}
      className={['CharacterSkill', className].join(' ')}>
      <img src={skill.getImgUrl()} alt={skill.getName()} />
      <Popper id={id} open={open} anchorEl={anchorEl} placement="top" className="CharacterSkill-tooltip">
        <div className="tooltip">
          <div>
            {t['level']}: {skill.getLevel()} {' -> '} {skill.getLevel() + x}
          </div>
          <div>
            Cost:{' '}
            {Object.entries(skill.getCost(x)).map(([currency, value]) => {
              return (
                <div key={currency}>
                  {currency} {value}
                </div>
              );
            })}
          </div>
          <div>{skill.isPassive() ? 'passive' : 'active'}</div>
          <div>{skill.getName()}</div>
        </div>
      </Popper>
    </div>
  );
};

CharacterSkill.propTypes = {
  skill: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default CharacterSkill;
