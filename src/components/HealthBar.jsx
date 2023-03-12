import React from 'react';
import PropTypes from '../externalLibraries/propTypes';
import './HealthBar.scss';

const HealthBar = (props) => {
  return <div className={'HealthBar'}>{`${props.currentHealth} / ${props.totalHealth}`}</div>;
};

HealthBar.propTypes = {
  currentHealth: PropTypes.any,
  totalHealth: PropTypes.any,
};

export default HealthBar;
