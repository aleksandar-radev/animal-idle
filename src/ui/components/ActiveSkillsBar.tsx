import { useMemo, useState, useEffect } from 'react';
import './ActiveSkillsBar.scss';
import { Tooltip } from '@mui/material';
import SkillTooltip from './SkillTooltip';
import useGameStore from '@/hooks/general/useGameStore';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useEnemyMethods from '@/hooks/gameMethods/useEnemyMethods';

const ActiveSkillsBar = ({ className }) => {
  const { data, assets, fightState } = useGameStore();
  const cm = useCharacterMethods();
  const em = useEnemyMethods();
  const [activeSkills, setActiveSkills] = useState({});

  const skills = useMemo(() => {
    let allSkills = [];
    let skillsByCharacter = cm.getActiveSkillsOfCharactersInActiveDeck();

    Object.keys(skillsByCharacter).forEach((char) => {
      Object.keys(skillsByCharacter[char]).forEach((skillName) => {
        allSkills.push(skillsByCharacter[char][skillName]);
      });
    });

    return allSkills;
  }, []);

  const activateSkill = (skill) => {
    log('Activating skill', skill);
    if (activeSkills[skill.name] || skill.manaCost > fightState.characterCurrentMana) {
      return;
    }
    log('Activating skill', fightState.characterCurrentMana);

    setActiveSkills((prev) => ({ ...prev, [skill.name]: true }));

    // Start cooldown animation
    setTimeout(() => {
      setActiveSkills((prev) => ({ ...prev, [skill.name]: false }));
    }, skill.cooldown);
  };

  return (
    <div className={['ActiveSkillsBar', className].join(' ')}>
      <div className={'ActiveSkillsBar-row'}>
        {skills.map((skill) => {
          let classes = [
            'ActiveSkillsBar-row-item',
            activeSkills[skill?.name] ? 'cooldown' : '',
            skill?.manaCost > fightState.characterCurrentMana ? 'disabled' : '',
          ];

          return (
            <Tooltip
              placement="top"
              title={<SkillTooltip name={skill.name} cooldown={skill?.cooldown / 1000} />}
              key={skill.name}>
              <div
                className={classes.join(' ')}
                style={{
                  backgroundImage: `url(${assets[skill.type]})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                data-skill={skill?.name}
                onClick={() => activateSkill(skill)}>
                {activeSkills[skill?.name] && <div className="cooldown-overlay" />}
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveSkillsBar;
