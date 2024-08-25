import './CharacterGrid.scss';
import CharacterAvatar from './CharacterAvatar';
import useGameStore from '@/hooks/general/useGameStore';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';

const CharacterGrid = ({ className }) => {
  const { data } = useGameStore();
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
