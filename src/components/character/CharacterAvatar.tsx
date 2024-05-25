import PropTypes from '../../helpers/externalLibraries/propTypes';
import './CharacterAvatar.scss';
import useStore from '../../hooks/useStore';

const CharacterAvatar = ({ className = '', character }) => {
  const { assets } = useStore();
  const avatar = assets[character.type];

  return (
    <div className="CharacterAvatar">
      <div className={`avatar`}>
        <img src={avatar} />
      </div>
    </div>
  );
};

export default CharacterAvatar;
