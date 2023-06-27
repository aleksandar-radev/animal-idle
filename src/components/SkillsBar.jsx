import { useContext, useEffect, useRef, useState } from 'react';
import { State } from '../api/Store';
import { CHARACTER_SKILL_AUTO_CAST } from '../constants/gameVariables';
import PropTypes from '../externalLibraries/propTypes';
import './SkillsBar.scss';

const SkillsBar = ({ className }) => {
  const [store] = useContext(State);
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
      Object.keys(store.character.skills).forEach((skillName) => {
        const target = document.querySelector(`[data-skill='${skillName}']`);
        activateSkill({ target });
      });
    }
  }, [activeSkills]);

  const handleKeyPress = (e) => {
    const keyId = String.fromCharCode(e.which);
    const skill = store.character.getSkillById(keyId);

    if (!skill) return;
    const target = document.querySelector(`[data-skill='${skill.name}']`);
    activateSkill({ target });
  };

  const renderDomSkills = () => {
    const newDomSkills = [];
    for (let id = 1; id < skillsPerRow * totalSkillRows; id++) {
      const skill = store.character.getSkillById(id);
      const img = store.assets[skill?.name];

      newDomSkills.push(
        <div
          className={`
            SkillsBar-row-item 
            ${activeSkills[skill?.name] ? 'cooldown' : ''}
            ${skill?.manaCost > store.character.getCurrentMana() ? 'disabled' : ''}
          `}
          style={{
            backgroundImage: `url(${store.assets[skill?.name]})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          data-skill={skill?.name}
          key={skill?.name || id}
          onClick={activateSkill}>
          <p>{!img ? skill?.name : ''}</p>
        </div>,
      );
    }
    return newDomSkills;
  };

  const activateSkill = (event) => {
    const { target } = event;
    const skillName = target.dataset.skill;
    const skill = store.character.skills[skillName];

    if (target.classList.contains('cooldown')) return;
    if (!skill || store.character.getCurrentMana() < skill.manaCost) return;

    store.character.updateMana(-skill.manaCost);

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
      // target.textContent = ((skill.cooldown - elapsedTime) / 1000).toFixed(2);

      if (elapsedTime < skill.cooldown) {
        requestAnimationFrame(animateCooldown);
      } else {
        // target.textContent = skill.name;
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
