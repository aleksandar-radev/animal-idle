import PropTypes from '../../helpers/externalLibraries/propTypes';
import './CharacterGrid.scss';
import CharacterAvatar from './CharacterAvatar';
import useStore from '../../hooks/useStore';

const CharacterGrid = ({ className }) => {
  const { data } = useStore();
  const characters = data.characters.getCharactersInActiveDeck();

  return (
    <div className={['CharacterGrid', className].join(' ')}>
      {characters.map((character) => {
        return (
          <div key={character.type} className="character">
            <CharacterAvatar character={character}></CharacterAvatar>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterGrid;
