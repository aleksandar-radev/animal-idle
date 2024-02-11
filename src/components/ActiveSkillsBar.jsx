import { useState } from 'react';
import PropTypes from '../externalLibraries/propTypes';
import './ActiveSkillsBar.scss';
import { Tooltip } from '@mui/material';
import SkillTooltip from './SkillTooltip';
import useCharactersSkills from '../hooks/useCharactersSkills';
import useStore from '../hooks/useStore';

const ActiveSkillsBar = ({ className }) => {
  const { store } = useStore();
  const [activeSkills, setActiveSkills] = useState({});
  const { a } = useCharactersSkills();

  const getSkills = () => {
    let allSkills = [];
    let skills = store.characters.getActiveCharactersSkills();

    Object.keys(skills).forEach((skill) => {
      Object.keys(skills[skill]).forEach((skillName) => {
        allSkills.push(skills[skill][skillName]);
      });
    });

    return allSkills;
  };

  return (
    <>
      <div className={['ActiveSkillsBar', className].join(' ')}>
        <div className={'ActiveSkillsBar-row'}>
          {getSkills().map((skill) => {
            console.log(skill);
            let classes = [
              'ActiveSkillsBar-row-item',
              activeSkills[skill?.name] ? 'cooldown' : '',
              skill?.manaCost > store.characters.getCurrentMana() ? 'disabled' : '',
            ];

            return (
              <Tooltip
                placement="top"
                title={<SkillTooltip name={skill.name} cooldown={skill?.cooldown / 1000} />}
                key={skill.name}>
                <div
                  className={classes.join(' ')}
                  style={{
                    backgroundImage: `url(${store.assets[skill?.name]})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                  data-skill={skill?.name}
                  // onClick={activateSkill}>
                ></div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </>
  );
};

ActiveSkillsBar.propTypes = {
  className: PropTypes.string,
};

export default ActiveSkillsBar;
