// Link to propTypes file: file://../externalLibraries/propTypes.js
import PropTypes from '../externalLibraries/propTypes';

const FightLog = ({ className }) => {
  return <div className={className}>FightLog</div>;
};

FightLog.propTypes = {
  className: PropTypes.string,
};

export default FightLog;
