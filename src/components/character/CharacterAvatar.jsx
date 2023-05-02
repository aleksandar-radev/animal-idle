import React, { useContext } from 'react';
import { State } from '../../api/Store';
import PropTypes from '../../externalLibraries/propTypes';

const CharacterAvatar = ({ className }) => {
  const [store] = useContext(State);
  return <div className={className}>CharacterAvatar LVL: {store.data?.enemy?.level || 0}</div>;
};

CharacterAvatar.propTypes = {
  className: PropTypes.string,
};

export default CharacterAvatar;
