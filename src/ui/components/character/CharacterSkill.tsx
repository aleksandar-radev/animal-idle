import React, { useMemo, useState } from 'react';
import './CharacterSkill.scss';
import { Popper } from '@mui/material';
import useTranslations from '@/hooks/general/useTranslations';
import Skill from '@/models/Skill';
import Requirement from '@/models/Requirement';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useGameStore from '@/hooks/general/useGameStore';
import RequirementsView from '@/ui/components/general/RequirementsView';

interface CharacterSkillProps {
  className?: string;
  skill: Skill;
  x: number;
}
const CharacterSkill: React.FC<CharacterSkillProps> = ({ className, skill, x }) => {
  const { assets } = useGameStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [u, setU] = useState(0);
  const cm = useCharacterMethods();
  const t = useTranslations();
  const activeCharacter = cm.getActiveCharacter();
  const open = Boolean(anchorEl);

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

  const canBuySkill = cm.areRequirementsMet(skill.requirements);
  log(skill);

  return (
    <div
      className={['CharacterSkill', className, !canBuySkill ? 'disabled' : ''].join(' ')}
      onClick={canBuySkill ? buySkill : undefined}>
      <img src={assets[skill.type]} alt={skill.name} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top"
        className="CharacterSkill-tooltip"
        onMouseLeave={handleMouseLeave}>
        <div className="tooltip">
          <div>
            {skill.name} ({skill.passive ? 'passive' : 'active'})
          </div>
          <div>
            {t['level']}: {skillLevel} {' -> '} {skillLevel + x}
          </div>
          <div></div>
          <RequirementsView requirements={skill.requirements} />
        </div>
      </Popper>
    </div>
  );
};
export default CharacterSkill;
