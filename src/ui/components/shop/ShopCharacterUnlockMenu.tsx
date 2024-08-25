import { useContext } from 'react';
import './ShopCharacterUnlockMenu.scss';
import useStore from '@/hooks/useStore';
import Character from '@/models/Character';
import useCharacterMethods from '@/hooks/useCharacterMethods';
import CharacterAvatar from '@/ui/components/character/CharacterAvatar';

const ShopCharacterUnlockMenu = ({ character }) => {
  const cm = useCharacterMethods();

  return (
    <>
      <div className="ShopCharacterUnlockMenu">
        <CharacterAvatar className="avatar" characterType={character.type} />
        <div className="details">
          <div>Price:</div>
          <div>1g</div>
          <button onClick={() => cm.buyCharacter(character.type)}>Buy</button>
        </div>
      </div>
    </>
  );
};

export default ShopCharacterUnlockMenu;
