import React, { useMemo, useState } from 'react';
import './CharacterSkill.scss';
import { Popper } from '@mui/material';
import useTranslations from '@/hooks/general/useTranslations';
import Skill from '@/models/Skill';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useGameStore from '@/hooks/general/useGameStore';
import RequirementsView from '@/ui/components/general/RequirementsView';
import useRequirementMethods from '@/hooks/gameMethods/useRequirementMethods';

interface CharacterSkillProps {
  className?: string;
  skillData: Skill;
  x: number;
}
const CharacterSkill: React.FC<CharacterSkillProps> = ({ className, skillData, x }) => {
  const { assets } = useGameStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [u, setU] = useState(0);
  const cm = useCharacterMethods();
  const requirements = useRequirementMethods();
  const t = useTranslations();
  const activeCharacter = cm.getActiveCharacter();
  const open = Boolean(anchorEl);

  const skill = useMemo(
    () => activeCharacter.skills[skillData.type] || new Skill(skillData),
    [activeCharacter.skills[skillData.type]],
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

  const canBuySkill = requirements.areRequirementsMet(skill);

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
            {typeof t[skill.type + '-description'] === 'function'
              ? t[skill.type + '-description'](skill.level)
              : t[skill.type + '-description'] || 'Description not available'}
          </div>
          <div>
            {t['level']}: {skill.level} {' -> '} {skill.level + x}
          </div>
          <div></div>
          <RequirementsView resource={skill} />
        </div>
      </Popper>
    </div>
  );
};
export default CharacterSkill;
