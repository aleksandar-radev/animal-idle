import React from 'react';
import './CharacterSkill.scss';
import PropTypes from '../../externalLibraries/propTypes';

const CharacterSkill = ({ skill }) => {
  console.log(skill);
  return <div className="CharacterSkill">{skill.getLevel()}</div>;
};

CharacterSkill.propTypes = {
  skill: PropTypes.object.isRequired,
};

export default CharacterSkill;
