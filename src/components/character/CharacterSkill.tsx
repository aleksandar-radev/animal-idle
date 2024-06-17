import React, { useState } from 'react';
import './CharacterSkill.scss';
import { Popper } from '@mui/material';
import useTranslations from '../../hooks/useTranslations';
import Skill from '../../models/Skill';
import Requirement from '../../models/Requirement';

interface CharacterSkillProps {
  className?: string;
  skill: Skill; // Define the skill prop type as Skill
  x: number;
}

const CharacterSkill: React.FC<CharacterSkillProps> = ({ className, skill, x }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const t = useTranslations();
  const open = Boolean(anchorEl);
  const id = open ? 'skill-popper' : undefined;

  const skillLevel = skill.level || 0;

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
            {t['level']}: {skillLevel} {' -> '} {skillLevel + x}
          </div>
          <div>
            {t['cost']}:{' '}
            {skill.requirements.map((req) => {
              if (req.type === Requirement.REQUIREMENT_TYPE_CURRENCY) {
                return (
                  <div key={req.type}>
                    {req.innerType} {req.value}
                  </div>
                );
              }
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
