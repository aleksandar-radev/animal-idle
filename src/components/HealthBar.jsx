import React from 'react';
import PropTypes from '../externalLibraries/propTypes';
import './HealthBar.scss';

const HealthBar = ({ currentHealth, totalHealth }) => {
  const percentage = (currentHealth / totalHealth) * 100;
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, hsl(calc(${percentage} * 1.2), 100%, 50%)  ${percentage}%, white ${percentage}%)`,
      }}
      className={'HealthBar'}>{`${currentHealth} / ${totalHealth}`}</div>
  );
};

HealthBar.propTypes = {
  currentHealth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalHealth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HealthBar;
