import React, { useContext, useEffect, useRef, useState } from 'react';
import { State } from '../api/Store';
import PropTypes from '../externalLibraries/propTypes';
import './SkillsBar.scss';

const SkillsBar = ({ className }) => {
  const [store] = useContext(State);
  const [activeSkills, setActiveSkills] = useState({});
  const skillShouldStop = useRef(false);
  const skillsPerRow = 10;
  const totalSkillRows = 2;

  const renderDomSkills = () => {
    const newDomSkills = [];
    for (let id = 1; id < skillsPerRow * totalSkillRows; id++) {
      const skill = store.character.getSkillById(id);

      newDomSkills.push(
        <div
          className={`
            SkillsBar-row-item 
            ${activeSkills[skill?.name] ? 'cooldown' : ''}
            ${skill?.manaCost > store.character.getCurrentMana() ? 'disabled' : ''}
          `}
          data-skill={skill?.name}
          key={skill?.name || id}
          onClick={activateSkill}>
          {skill?.name || ''}
        </div>,
      );
    }
    return newDomSkills;
  };

  // stop skill if on another screen
  useEffect(() => {
    skillShouldStop.current = false;
    return () => {
      skillShouldStop.current = true;
    };
  }, []);

  const handleKeyPress = (e) => {
    const keyId = String.fromCharCode(e.which);
    const skill = store.character.getSkillById(keyId);

    if (!skill) return;
    const target = document.querySelector(`[data-skill='${skill.name}']`);

    if (target.classList.contains('cooldown')) return;
    activateSkill({ target });
  };

  //handle key press events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [store.character.skills]);

  const activateSkill = (event) => {
    const { target } = event;
    const skillName = target.dataset.skill;
    const skill = store.character.skills[skillName];

    if (!skill || store.character.getCurrentMana() < skill.manaCost) return;

    store.character.updateMana(-skill.manaCost);

    setActiveSkills((prev) => ({ ...prev, [skillName]: true }));

    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (skillShouldStop.current) return;

      if (!startTime) {
        startTime = timestamp;
      }

      let elapsedTime = timestamp - startTime;
      const passedTime = (elapsedTime / skill.cooldown) * 100;

      target.style.setProperty('--time-left', `${passedTime}%`);
      target.textContent = ((skill.cooldown - elapsedTime) / 1000).toFixed(2);

      if (elapsedTime < skill.cooldown) {
        requestAnimationFrame(animateCooldown);
      } else {
        target.textContent = skill.name;
        target.style.removeProperty('--time-left');
        setActiveSkills((prev) => ({ ...prev, [skillName]: false }));

        skill.cast();
      }
    };
    requestAnimationFrame(animateCooldown);
  };

  return (
    <>
      <div className={['SkillsBar', className].join(' ')}>
        <div className={'SkillsBar-row'}>{renderDomSkills().slice(0, skillsPerRow)}</div>
        {store.character.skills.length > skillsPerRow && (
          <div className={'SkillsBar-row'}>
            {renderDomSkills().slice(skillsPerRow, skillsPerRow * totalSkillRows)}
          </div>
        )}
      </div>
    </>
  );
};

SkillsBar.propTypes = {
  className: PropTypes.string,
};

export default SkillsBar;
