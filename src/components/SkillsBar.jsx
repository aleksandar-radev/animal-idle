import React, { useContext, useEffect, useRef, useState } from 'react';
import { SkillsRepo } from '../api/SkillsRepo';
import { State } from '../api/Store';
import PropTypes from '../externalLibraries/propTypes';
import './SkillsBar.scss';

const SkillsBar = (props) => {
  const [store, setStore] = useContext(State);
  const [skills, setSkills] = useState([]);
  const [domSkills, setDomSkills] = useState([]);
  const skillShouldStop = useRef(false);

  useEffect(() => {
    fetchSkills(setSkills);
    skillShouldStop.current = false;
    return () => {
      skillShouldStop.current = true;
    };
  }, []);

  useEffect(() => {
    fillDomSkills(skills, setDomSkills, activateSkill);
  }, [skills]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [skills]);

  const handleKeyPress = (e) => {
    const keyId = String.fromCharCode(e.which);
    let skill = skills.find((s) => s.id == keyId);
    if (!skill) return;
    const target = document.querySelector(`[data-skill='${skill.id}']`);
    if (target.classList.contains('disabled')) return;
    activateSkill({ target });
  };

  const activateSkill = (event) => {
    const { target } = event;
    const skill = skills.find((skill) => +skill.id === +target.dataset.skill);
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

        store.character.skills[skill.name](store);
        setStore({ ...store });
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

async function fetchSkills(setSkills) {
  let skillsData = await SkillsRepo.getSkills();
  setSkills(skillsData);
}

function fillDomSkills(skills, setDomSkills, activateSkill) {
  if (!skills.length) return;

  let newDomSkills = [];
  for (let i = 0; i < 20; i++) {
    newDomSkills.push(
      <div className="SkillsBar-row-item a" data-skill={i + 1} key={i} onClick={activateSkill}>
        {skills[i]?.name || ''}
      </div>,
    );
  }
  setDomSkills(newDomSkills);
}
