import PropTypes from '../../helpers/externalLibraries/propTypes';
import './CharacterAvatar.scss';
import useStore from '../../hooks/useStore';

const CharacterAvatar = ({ className, character }) => {
  const { store } = useStore();
  const avatar = store.assets[character.type];
  return (
    <div className="CharacterAvatar">
      <div className={`avatar`}>
        <img src={avatar} />
      </div>
    </div>
  );
};

CharacterAvatar.propTypes = {
  className: PropTypes.string,
  character: PropTypes.object,
};

export default CharacterAvatar;
