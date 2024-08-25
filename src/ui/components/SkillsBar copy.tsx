import { useEffect, useRef, useState } from 'react';
import { CHARACTER_SKILL_AUTO_CAST } from '@/helpers/constants/gameVariables';
import './SkillsBar.scss';
import { Tooltip } from '@mui/material';
import SkillTooltip from './SkillTooltip';
import useTranslations from '@/hooks/useTranslations';
import useStore from '@/hooks/useStore';

const SkillsBar = ({ className }) => {
  const { store } = useStore();
  const t = useTranslations();
  const [activeSkills, setActiveSkills] = useState({});
  const skillShouldStop = useRef(false);
  const skillsPerRow = 10;
  const totalSkillRows = 2;

  // Stop skill if on another screen
  useEffect(() => {
    skillShouldStop.current = false;
    return () => {
      skillShouldStop.current = true;
    };
  }, []);

  // Handle key press events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Auto cast
  useEffect(() => {
    if (activeSkills[CHARACTER_SKILL_AUTO_CAST]) {
      Object.keys(store.characters.skills).forEach((skillName) => {
        const target = document.querySelector(`[data-skill='${skillName}']`);
        activateSkill({ target });
      });
    }
  }, [activeSkills]);

  const handleKeyPress = (e) => {
    const keyId = String.fromCharCode(e.which);
    const skill = store.characters.getSkillById(keyId);

    if (!skill) return;
    const target = document.querySelector(`[data-skill='${skill.name}']`);
    activateSkill({ target });
  };

  const renderDomSkills = () => {
    const newDomSkills = [];
    for (let id = 1; id < skillsPerRow * totalSkillRows; id++) {
      const skill = store.characterss['barbarian'].getSkillById(id);
      const skillName = t[skill?.name] || skill?.name;
      const img = store.assets[skill?.name];

      let classes = [
        'SkillsBar-row-item',
        activeSkills[skill?.name] ? 'cooldown' : '',
        skill?.manaCost > store.characterss['barbarian'].getCurrentMana() ? 'disabled' : '',
      ];

      newDomSkills.push(
        <Tooltip
          placement="top"
          title={<SkillTooltip name={skillName} cooldown={skill?.cooldown / 1000} />}
          key={skill?.name || id}>
          <div
            className={classes.join(' ')}
            style={{
              backgroundImage: `url(${store.assets[skill?.name]})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            data-skill={skill?.name}
            onClick={activateSkill}>
            {!img ? <p>{skillName}</p> : ''}
          </div>
        </Tooltip>,
      );
    }
    return newDomSkills;
  };

  const activateSkill = (event) => {
    const { target } = event;
    const skillName = target.dataset.skill;
    const skill = store.characters.skills[skillName];

    if (target.classList.contains('cooldown')) return;
    if (!skill || store.characters.getCurrentMana() < skill.manaCost) return;

    store.characters.updateMana(-skill.manaCost);

    setActiveSkills((prev) => ({ ...prev, [skillName]: true }));

    let startTime = null;
    skill.cast();
    const animateCooldown = (timestamp) => {
      if (skillShouldStop.current) return;

      if (!startTime) {
        startTime = timestamp;
      }

      let elapsedTime = timestamp - startTime;
      const passedTime = (elapsedTime / skill.cooldown) * 100;

      target.style.setProperty('--time-left', `${passedTime}%`);

      if (elapsedTime < skill.cooldown) {
        requestAnimationFrame(animateCooldown);
      } else {
        target.style.removeProperty('--time-left');
        setActiveSkills((prev) => ({ ...prev, [skillName]: false }));
      }
    };
    requestAnimationFrame(animateCooldown);
  };

  return (
    <>
      <div className={['SkillsBar', className].join(' ')}>
        <div className={'SkillsBar-row'}>{renderDomSkills().slice(0, skillsPerRow)}</div>
        {store.characters.skills.length > skillsPerRow && (
          <div className={'SkillsBar-row'}>{renderDomSkills().slice(skillsPerRow, skillsPerRow * totalSkillRows)}</div>
        )}
      </div>
    </>
  );
};

export default SkillsBar;
