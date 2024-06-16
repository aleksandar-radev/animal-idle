import './CharacterAvatar.scss';
import useStore from '../../hooks/useStore';

const CharacterAvatar = ({ className = '', characterType }) => {
  const { assets } = useStore();
  const avatar = assets[characterType]; // when character is a string

  return (
    <div className="CharacterAvatar">
      <div className={`avatar`}>
        <img src={avatar} />
      </div>
    </div>
  );
};

export default CharacterAvatar;
