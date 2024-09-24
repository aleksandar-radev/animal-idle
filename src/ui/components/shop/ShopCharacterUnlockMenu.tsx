import './ShopCharacterUnlockMenu.scss';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useTranslations from '@/hooks/general/useTranslations';
import CharacterAvatar from '@/ui/components/character/CharacterAvatar';
import RequirementsView from '@/ui/components/general/RequirementsView';

const ShopCharacterUnlockMenu = ({ character }) => {
  const cm = useCharacterMethods();
  const t = useTranslations();
  const isUnlockable = cm.areRequirementsMet(character.requirements);
  const characterStats = cm.getCharacterByType(character.type);

  return (
    <>
      <div className="ShopCharacterUnlockMenu">
        <CharacterAvatar className="avatar" characterType={character.type} />
        {cm.getActiveCharacterByType(character.type) == null ? (
          <div className="details">
            <RequirementsView requirements={character.requirements} />
            <button onClick={() => cm.buyCharacter(character.type)} disabled={!isUnlockable}>
              Buy
            </button>
          </div>
        ) : (
          <div className="details">Unlocked</div>
        )}

        <div className="stats">
          <h3>{t['stats']}</h3>
          <div className="stat-item">
            {t['health']}: {characterStats.health}
          </div>
          <div className="stat-item">
            {t['damage']}: {characterStats.damage}
          </div>
          <div className="stat-item">
            {t['attackSpeed']}: {characterStats.attackSpeed / 1000}
          </div>
          <div className="stat-item">
            {t['mana']}: {characterStats.mana}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCharacterUnlockMenu;
