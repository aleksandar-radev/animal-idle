import { useMemo, useState } from 'react';
import './CharacterSkills.scss';
import CharacterSkill from './CharacterSkill';
import useTranslations from '../../hooks/useTranslations';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import Skill from '../../models/Skill';

const CharacterSkills = () => {
  const cm = useCharacterMethods();
  const t = useTranslations();
  const possibleMultipliers = [1]; // TODO: add more values
  // const possibleMultipliers = [0, 1, 10, 50, 200];
  const [attackMultiplier, setAttackMultiplier] = useState(1);
  const [defenseMultiplier, setDefenseMultiplier] = useState(1);
  const [utilityMultiplier, setUtilityMultiplier] = useState(1);

  const activeCharacter = cm.getActiveCharacter();
  const characterSkills = cm.getAllSkillsForCharacter(activeCharacter.type);

  const getSkillsByCategory = (category: string): Skill[] => {
    return Object.values(characterSkills)
      .filter((skill) => skill.category === category)
      .sort((a, b) => a.index - b.index);
  };

  const characterAttackSkills = useMemo(() => getSkillsByCategory(Skill.SKILL_CATEGORY_ATTACK), [characterSkills]);
  const characterDefenseSkills = useMemo(() => getSkillsByCategory(Skill.SKILL_CATEGORY_DEFENSE), [characterSkills]);
  const characterUtilitySkills = useMemo(() => getSkillsByCategory(Skill.SKILL_CATEGORY_UTILITY), [characterSkills]);

  const groupSkillsByLevelRequired = (skills: Skill[]): { [key: number]: Skill[] } => {
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

  const groupedAttackSkills = useMemo(() => groupSkillsByLevelRequired(characterAttackSkills), [characterAttackSkills]);
  const groupedDefenseSkills = useMemo(
    () => groupSkillsByLevelRequired(characterDefenseSkills),
    [characterDefenseSkills],
  );
  const groupedUtilitySkills = useMemo(
    () => groupSkillsByLevelRequired(characterUtilitySkills),
    [characterUtilitySkills],
  );

  const renderSkillGroups = (groupedSkills: { [key: number]: Skill[] }) => {
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
        {renderTitle(Skill.SKILL_CATEGORY_ATTACK, attackMultiplier, setAttackMultiplier)}
        {renderSkillGroups(groupedAttackSkills)}
      </div>
      <div className="defense section">
        {renderTitle(Skill.SKILL_CATEGORY_DEFENSE, defenseMultiplier, setDefenseMultiplier)}
        {renderSkillGroups(groupedDefenseSkills)}
      </div>
      <div className="utility section">
        {renderTitle(Skill.SKILL_CATEGORY_UTILITY, utilityMultiplier, setUtilityMultiplier)}
        {renderSkillGroups(groupedUtilitySkills)}
      </div>
    </div>
  );
};

export default CharacterSkills;
