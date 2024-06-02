import { useMemo, useState } from 'react';
import './CharacterSkills.scss';
import useStore from '../../hooks/useStore';
import CharacterSkill from './CharacterSkill';
import useTranslations from '../../hooks/useTranslations';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import Skill from '../../models/Skill';

const CharacterSkills = () => {
  const { data } = useStore();
  const cm = useCharacterMethods();
  const t = useTranslations();
  const possibleMultipliers = [1]; // TODO: add more values
  // const possibleMultipliers = [0, 1, 10, 50, 200];
  const [attackMultiplier, setAttackMultiplier] = useState(1);
  const [defenseMultiplier, setDefenseMultiplier] = useState(1);
  const [utilityMultiplier, setUtilityMultiplier] = useState(1);

  const activeCharacter = cm.getActiveCharacter();

  const getSkillsByType = (type: string) => {
    return Object.values(activeCharacter.skills)
      .filter((skill) => skill.type === type)
      .sort((a, b) => a.index - b.index);
  };

  const attackSkills = useMemo(() => getSkillsByType(Skill.SKILL_TYPE_ATTACK), [activeCharacter.skills]);
  const defenseSkills = useMemo(() => getSkillsByType(Skill.SKILL_TYPE_DEFENSE), [activeCharacter.skills]);
  const utilitySkills = useMemo(() => getSkillsByType(Skill.SKILL_TYPE_UTILITY), [activeCharacter.skills]);

  const groupSkillsByLevelRequired = (skills) => {
    return skills.reduce((acc, skill) => {
      const levelRequired = 0;
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
            <CharacterSkill className="skill" key={skill.name} skill={skill} x={attackMultiplier} />
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
        {renderTitle(Skill.SKILL_TYPE_ATTACK, attackMultiplier, setAttackMultiplier)}
        {renderSkillGroups(groupedAttackSkills)}
      </div>
      <div className="defense section">
        {renderTitle(Skill.SKILL_TYPE_DEFENSE, defenseMultiplier, setDefenseMultiplier)}
        {renderSkillGroups(groupedDefenseSkills)}
      </div>
      <div className="utility section">
        {renderTitle(Skill.SKILL_TYPE_UTILITY, utilityMultiplier, setUtilityMultiplier)}
        {renderSkillGroups(groupedUtilitySkills)}
      </div>
    </div>
  );
};

export default CharacterSkills;
