import './ShopCharacterUnlockMenu.scss';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import CharacterAvatar from '@/ui/components/character/CharacterAvatar';
import RequirementsView from '@/ui/components/general/RequirementsView';

const ShopCharacterUnlockMenu = ({ character }) => {
  const cm = useCharacterMethods();
  const isUnlockable = cm.areRequirementsMet(character.requirements);

  return (
    <>
      <div className="ShopCharacterUnlockMenu">
        <CharacterAvatar className="avatar" characterType={character.type} />
        <div className="details">
          <RequirementsView requirements={character.requirements} />
          <button onClick={() => cm.buyCharacter(character.type)} disabled={!isUnlockable}>
            Buy
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopCharacterUnlockMenu;
