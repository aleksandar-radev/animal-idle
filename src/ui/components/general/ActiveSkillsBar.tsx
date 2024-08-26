import { useMemo, useState, useEffect, useCallback } from 'react';
import './ActiveSkillsBar.scss';
import { Tooltip } from '@mui/material';
import SkillTooltip from './SkillTooltip';
import useGameStore from '@/hooks/general/useGameStore';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';

const ActiveSkillsBar = ({ className }) => {
  const { assets, fightState } = useGameStore();
  const cm = useCharacterMethods();
  const [activatedSkills, setActivatedSkills] = useState({});

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

  const activateSkill = useCallback(
    (skill) => {
      if (activatedSkills[skill.name] || skill.manaCost > fightState.characterCurrentMana) {
        return;
      }

      log('Activating skill', skill);
      setActivatedSkills((prev) => ({ ...prev, [skill.name]: true }));

      // Start cooldown animation
      setTimeout(() => {
        log('Deactivating skill', skill);
        setActivatedSkills((prev) => ({ ...prev, [skill.name]: false }));
      }, skill.cooldown);
    },
    [activatedSkills, fightState.characterCurrentMana],
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      if (key >= '1' && key <= '9') {
        const index = parseInt(key) - 1;
        if (index < skills.length) {
          activateSkill(skills[index]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [skills, activateSkill]);

  return (
    <div className={['ActiveSkillsBar', className].join(' ')}>
      <div className={'ActiveSkillsBar-row'}>
        {skills.map((skill) => {
          let classes = [
            'ActiveSkillsBar-row-item',
            activatedSkills[skill?.name] ? 'cooldown' : '',
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
                {Object.keys(activatedSkills).length}
                {activatedSkills[skill?.name] && (
                  <div className="cooldown-overlay" style={{ animationDuration: `${skill.cooldown}ms` }} />
                )}
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveSkillsBar;
