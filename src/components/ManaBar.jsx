import PropTypes from '../helpers/externalLibraries/propTypes';
import './ManaBar.scss';

const ManaBar = ({ currentMana, totalMana }) => {
  const percentage = (currentMana / totalMana) * 100;

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(50, 50, 255, 0.8) ${percentage}%, rgba(255, 255, 255, 0.5) ${percentage}%)`,
      }}
      className={'ManaBar'}>{`${currentMana} / ${totalMana}`}</div>
  );
};

ManaBar.propTypes = {
  currentMana: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalMana: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ManaBar;
