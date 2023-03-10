import PropTypes from 'prop-types';
import React from 'react';

const CharacterAvatar = (props) => {
  return <div className={props.className}>CharacterAvatar</div>;
};

CharacterAvatar.propTypes = {
  className: PropTypes.string,
};

export default CharacterAvatar;
