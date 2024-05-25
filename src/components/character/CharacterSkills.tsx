import React, { useMemo, useState } from 'react';
import './CharacterSkills.scss';
import useStore from '../../hooks/useStore';
import CharacterSkill from './CharacterSkill';
import { SKILLS_ATTACK, SKILLS_DEFENSE, SKILLS_UTILITY } from '../../helpers/constants/gameVariables';
import useTranslations from '../../hooks/useTranslations';

const CharacterSkills = () => {
  const { store } = useStore();
  const t = useTranslations();
  const possibleMultipliers = [1]; // TODO: add more values
  // const possibleMultipliers = [0, 1, 10, 50, 200];
  const [attackMultiplier, setAttackMultiplier] = useState(1);
  const [defenseMultiplier, setDefenseMultiplier] = useState(1);
  const [utilityMultiplier, setUtilityMultiplier] = useState(1);

  const activeCharacter = store.characters.getActiveCharacter();
  const attackSkills = activeCharacter.getPassiveSkillsByType(SKILLS_ATTACK);
  const defenseSkills = activeCharacter.getPassiveSkillsByType(SKILLS_DEFENSE);
  const utilitySkills = activeCharacter.getPassiveSkillsByType(SKILLS_UTILITY);

  const groupSkillsByLevelRequired = (skills) => {
    return skills.reduce((acc, skill) => {
      const levelRequired = skill.getLevelRequired();
      if (!acc[levelRequired]) {
        acc[levelRequired] = [];
      }
      acc[levelRequired].push(skill);
      return acc;
    }, {});
  };

  const nextMultiplier = (multiplier, setter) => {
    const nextIndex = (possibleMultipliers.indexOf(multiplier) + 1) % possibleMultipliers.length;
    setter(possibleMultipliers[nextIndex]);
  };

  const groupedAttackSkills = useMemo(() => groupSkillsByLevelRequired(attackSkills), [attackSkills]);
  const groupedDefenseSkills = useMemo(() => groupSkillsByLevelRequired(defenseSkills), [defenseSkills]);
  const groupedUtilitySkills = useMemo(() => groupSkillsByLevelRequired(utilitySkills), [utilitySkills]);

  const renderSkillGroups = (groupedSkills) => {
    return Object.entries(groupedSkills).map(([level, skills]) => {
      return (
        <div className="group" key={level}>
          {skills.map((skill) => (
            <CharacterSkill className="skill" key={skill.getName()} skill={skill} x={attackMultiplier} />
          ))}
        </div>
      );
    });
  };

  const renderTitle = (type, multiplier, setMultiplier) => {
    return (
      <div className="title">
        <span>{t[type]}</span>
        <span className="multiplier" onClick={() => nextMultiplier(multiplier, setMultiplier)}>
          {t.multiplier[multiplier]}
        </span>
      </div>
    );
  };

  return (
    <div className="CharacterSkills">
      <div className="attack section">
        {renderTitle(SKILLS_ATTACK, attackMultiplier, setAttackMultiplier)}
        {renderSkillGroups(groupedAttackSkills)}
      </div>
      <div className="defense section">
        {renderTitle(SKILLS_DEFENSE, defenseMultiplier, setDefenseMultiplier)}
        {renderSkillGroups(groupedDefenseSkills)}
      </div>
      <div className="utility section">
        {renderTitle(SKILLS_UTILITY, utilityMultiplier, setUtilityMultiplier)}
        {renderSkillGroups(groupedUtilitySkills)}
      </div>
    </div>
  );
};

export default CharacterSkills;
