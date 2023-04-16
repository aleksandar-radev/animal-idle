import React, { useContext, useEffect, useRef, useState } from 'react';
import { State } from '../api/Store';
import PropTypes from '../externalLibraries/propTypes';
import './SkillsBar.scss';

const SkillsBar = (props) => {
  const [store] = useContext(State);
  const [skills] = useState(store.character.skills);
  const [domSkills, setDomSkills] = useState([]);
  const skillShouldStop = useRef(false);

  // render DOM skills
  useEffect(() => {
    const newDomSkills = [];

    for (let id = 1; id < 20; id++) {
      const skill = store.character.getSkillById(id);

      newDomSkills.push(
        <div
          className="SkillsBar-row-item"
          data-skill={skill?.name}
          key={skill?.name || id}
          onClick={activateSkill}>
          {skill?.name || ''}
        </div>,
      );
    }
    setDomSkills(newDomSkills);
  }, [store.character.skills, store.character.skillsMap]);

  // stop skill if on another screen
  useEffect(() => {
    skillShouldStop.current = false;
    return () => {
      skillShouldStop.current = true;
    };
  }, []);

  const handleKeyPress = (e) => {
    const keyId = String.fromCharCode(e.which);
    let skill = store.character.getSkillById(keyId);

    if (!skill) return;
    const target = document.querySelector(`[data-skill='${skill.name}']`);

    if (target.classList.contains('disabled')) return;
    activateSkill({ target });
  };

  //handle key press events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [skills]);

  const activateSkill = (event) => {
    const { target } = event;
    const skillName = target.dataset.skill;
    const skill = skills[skillName];

    if (!skill) return;

    target.classList.add('disabled');
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
        target.classList.remove('disabled');

        store.character.skills[skill.name].cast();
      }
    };
    requestAnimationFrame(animateCooldown);
  };

  return (
    <>
      <div className={['SkillsBar', props.className].join(' ')}>
        <div className={'SkillsBar-row'}>{domSkills.slice(0, 10)}</div>
        {skills.length > 10 && <div className={'SkillsBar-row'}>{domSkills.slice(10, 20)}</div>}
      </div>
    </>
  );
};

SkillsBar.propTypes = {
  className: PropTypes.string,
};

export default SkillsBar;
