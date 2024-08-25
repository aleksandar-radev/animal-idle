import './CharacterGrid.scss';
import CharacterAvatar from './CharacterAvatar';
import useStore from '@/hooks/useStore';
import useCharacterMethods from '@/hooks/useCharacterMethods';

const CharacterGrid = ({ className }) => {
  const { data } = useStore();
  const cm = useCharacterMethods();

  return (
    <div className={['CharacterGrid', className].join(' ')}>
      {Array.from(cm.getCharactersInActiveDeck().values()).map((character) => {
        return (
          <div key={character.type} className="character">
            <CharacterAvatar characterType={character.type}></CharacterAvatar>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterGrid;
