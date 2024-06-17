import { useContext } from 'react';
import './ShopCharacterUnlockMenu.scss';
import useStore from '../../hooks/useStore';
import Character from '../../models/Character';
import CharacterAvatar from '../character/CharacterAvatar';
import useCharacterMethods from '../../hooks/useCharacterMethods';

const ShopCharacterUnlockMenu = ({ character }) => {
  const store = useStore();
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
