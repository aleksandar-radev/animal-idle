import React from 'react';
import PropTypes from '../externalLibraries/propTypes';

const FightLog = (props) => {
  return <div className={props.className}>FightLog</div>;
};

FightLog.propTypes = {
  className: PropTypes.string,
};

export default FightLog;
