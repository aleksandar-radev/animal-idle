import React from 'react';
import PropTypes from '../externalLibraries/propTypes';
import './ManaBar.scss';

const ManaBar = (props) => {
  return <div className={'ManaBar'}>{`${props.currentMana} / ${props.totalMana}`}</div>;
};

ManaBar.propTypes = {
  currentMana: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalMana: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ManaBar;
