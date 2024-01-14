import { useContext } from 'react';
import PropTypes from '../../externalLibraries/propTypes';
import { State } from '../../api/Store';
import './CharacterAvatar.scss';

const CharacterAvatar = ({ className, character }) => {
  const [store] = useContext(State);
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
