import { useContext } from 'react';
import './ShopCharacterUnlockMenu.scss';
import useStore from '../../hooks/useStore';
import Character from '../../models/Character';
import CharacterAvatar from '../character/CharacterAvatar';

const ShopCharacterUnlockMenu = ({ character }) => {
  const store = useStore();

  return (
    <>
      <div className="ShopCharacterUnlockMenu">
        <CharacterAvatar characterType={character?.type} />
      </div>
    </>
  );
};

export default ShopCharacterUnlockMenu;
