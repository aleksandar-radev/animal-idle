import { useState } from 'react';
import './ActiveSkillsBar.scss';
import { Tooltip } from '@mui/material';
import SkillTooltip from './SkillTooltip';
import useStore from '../hooks/useStore';
import useCharacterMethods from '../hooks/useCharacterMethods';

const ActiveSkillsBar = ({ className }) => {
  const { data, assets, fightState } = useStore();
  const { getActiveCharactersSkills } = useCharacterMethods();
  const [activeSkills, setActiveSkills] = useState({});

  const getSkills = () => {
    let allSkills = [];
    let skills = getActiveCharactersSkills();

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
            let classes = [
              'ActiveSkillsBar-row-item',
              activeSkills[skill?.name] ? 'cooldown' : '',
              skill?.manaCost > fightState.getCurrentMana() ? 'disabled' : '',
            ];

            return (
              <Tooltip
                placement="top"
                title={<SkillTooltip name={skill.name} cooldown={skill?.cooldown / 1000} />}
                key={skill.name}>
                <div
                  className={classes.join(' ')}
                  style={{
                    backgroundImage: `url(${assets[skill?.name]})`,
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

export default ActiveSkillsBar;
