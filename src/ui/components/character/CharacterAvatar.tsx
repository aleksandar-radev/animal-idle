import './CharacterAvatar.scss';
import useGameStore from '@/hooks/general/useGameStore';

const CharacterAvatar = ({ className = '', characterType }) => {
  const { assets } = useGameStore();
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
