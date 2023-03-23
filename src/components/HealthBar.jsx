import React from 'react';
import PropTypes from '../externalLibraries/propTypes';
import './HealthBar.scss';

const HealthBar = (props) => {
  const percentage = (props.currentHealth / props.totalHealth) * 100;
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, hsl(calc(${percentage} * 1.2), 100%, 50%)  ${percentage}%, white ${percentage}%)`,
      }}
      className={'HealthBar'}>{`${props.currentHealth} / ${props.totalHealth}`}</div>
  );
};

HealthBar.propTypes = {
  currentHealth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalHealth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HealthBar;
