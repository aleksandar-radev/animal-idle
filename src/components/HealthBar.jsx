import React from 'react';
import PropTypes from '../externalLibraries/propTypes';
import './HealthBar.scss';

const HealthBar = (props) => {
  return <div className={'HealthBar'}>{`${props.currentHealth} / ${props.totalHealth}`}</div>;
};

HealthBar.propTypes = {
  currentHealth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalHealth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HealthBar;
