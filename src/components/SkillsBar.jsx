import React, { useEffect, useRef, useState } from 'react';
import { SkillsRepo } from '../api/SkillsRepo';
import PropTypes from '../externalLibraries/propTypes';
import './SkillsBar.scss';

const SkillsBar = (props) => {
  const [skills, setSkills] = useState([]);
  const skillShouldStop = useRef(false);

  useEffect(() => {
    (async () => {
      let skillsData = await SkillsRepo.getSkills();
      setSkills(skillsData);
    })();
    skillShouldStop.current = false;
    return () => {
      skillShouldStop.current = true;
    };
  }, []);

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
    const target = document.querySelector(`[data-skill='${skill.name}']`);
    if (target.classList.contains('disabled')) return;
    activateSkill({ target });
  };

  const activateSkill = (event) => {
    const { target } = event;
    const skill = skills.find((skill) => skill.name === target.dataset.skill);

    if (!target.classList.contains('SkillsBar-row-item') || !skill) return;

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
        // add skill function
        console.log('ATACK');
      }
    };
    requestAnimationFrame(animateCooldown);
  };

  const getRowSkills = (start, end) => {
    if (!skills.length) return;
    let skillsRow = [];
    for (let i = start; i < end; i++) {
      let skillName = skills[i]?.name || '';
      skillsRow.push(
        <div className="SkillsBar-row-item" data-skill={skillName} key={i}>
          {skillName}
        </div>,
      );
    }

    return skillsRow;
  };

  return (
    <>
      <div className={['SkillsBar', props.className].join(' ')}>
        <div className={'SkillsBar-row'} onClick={activateSkill}>
          {getRowSkills(0, 10)}
        </div>
        {skills.length > 9 && (
          <div className={'SkillsBar-row'} onClick={activateSkill}>
            {getRowSkills(10, 20)}
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
