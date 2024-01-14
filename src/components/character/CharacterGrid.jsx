import React, { useContext } from 'react';
import PropTypes from '../../externalLibraries/propTypes';
import './CharacterGrid.scss';
import { State } from '../../api/Store';
import CharacterAvatar from './CharacterAvatar';

const CharacterGrid = ({ className }) => {
  const [store] = useContext(State);
  const getActiveCharacters = store.characters.getActiveCharacters();

  return (
    <div className={['CharacterGrid', className].join(' ')}>
      {getActiveCharacters.map((character) => {
        console.log(character);
        return (
          <div key={character.key} className="character">
            <CharacterAvatar character={character}></CharacterAvatar>
          </div>
        );
      })}
    </div>
  );
};

CharacterGrid.propTypes = {
  className: PropTypes.string,
};

export default CharacterGrid;
