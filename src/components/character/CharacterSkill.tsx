import React, { useMemo, useState } from 'react';
import './CharacterSkill.scss';
import { Popper } from '@mui/material';
import useTranslations from '../../hooks/useTranslations';
import Skill from '../../models/Skill';
import Requirement from '../../models/Requirement';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import useStore from '../../hooks/useStore';

interface CharacterSkillProps {
  className?: string;
  skill: Skill;
  x: number;
}

const CharacterSkill: React.FC<CharacterSkillProps> = ({ className, skill, x }) => {
  const { assets } = useStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [u, setU] = useState(0);
  const cm = useCharacterMethods();
  const t = useTranslations();
  const activeCharacter = cm.getActiveCharacter();
  const open = Boolean(anchorEl);
  const id = open ? 'skill-popper' : undefined;

  const skillLevel = useMemo(
    () => activeCharacter.skills[skill.type]?.level || 0,
    [activeCharacter.skills[skill.type]?.level, activeCharacter.skills[skill.type]],
  );

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const buySkill = () => {
    setU(u + 1);
    cm.buySkill(activeCharacter, skill);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={buySkill}
      className={['CharacterSkill', className].join(' ')}>
      <img src={assets[skill.type]} alt={skill.name} />
      <Popper id={id} open={open} anchorEl={anchorEl} placement="top" className="CharacterSkill-tooltip">
        <div className="tooltip">
          <div>
            {skill.name} ({skill.passive ? 'passive' : 'active'})
          </div>
          <div>
            {t['level']}: {skillLevel} {' -> '} {skillLevel + x}
          </div>
          <div></div>
          <div>
            {t['requirements']}:{' '}
            {skill.requirements.map((req) => {
              if (req.type === Requirement.REQUIREMENT_TYPE_CURRENCY) {
                return (
                  <div key={req.type}>
                    {t[req.innerType]}: {req.value}
                  </div>
                );
              }
              if (req.type === Requirement.REQUIREMENT_TYPE_LEVEL) {
                return <div key={req.type}>Required Level: {req.value}</div>;
              }
            })}
          </div>
        </div>
      </Popper>
    </div>
  );
};

export default CharacterSkill;
