import React from 'react';
import PropTypes from '../externalLibraries/propTypes';

const CharacterAvatar = (props) => {
  return <div className={props.className}>CharacterAvatar</div>;
};

CharacterAvatar.propTypes = {
  className: PropTypes.string,
};

export default CharacterAvatar;
