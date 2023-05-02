import PropTypes from '../../externalLibraries/propTypes';

const CharacterAvatar = ({ className }) => {
  return <div className={className}>CharacterAvatar</div>;
};

CharacterAvatar.propTypes = {
  className: PropTypes.string,
};

export default CharacterAvatar;
