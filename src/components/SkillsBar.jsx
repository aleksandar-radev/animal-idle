import React from 'react';
import './SkillsBar.scss';

const SkillsBar = (props) => {
  const allSkills = [];
  for (let i = 1; i < 11; i++) {
    allSkills.push(<div key={i}> {i}</div>);
  }

  const firstRowSkills = allSkills.slice(0, 10);
  const secondRowSkills = allSkills.slice(10);

  return (
    <>
      <div className={['SkillsBar', props.className].join(' ')}>
        <div className={'SkillsBar-row'}>{firstRowSkills}</div>
        {secondRowSkills.length > 0 && <div className={'SkillsBar-row'}>{secondRowSkills}</div>}
      </div>
    </>
  );
};

export default SkillsBar;
