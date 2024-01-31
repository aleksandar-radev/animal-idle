import React from 'react';
import PropTypes from '../../externalLibraries/propTypes';
import './CharacterGrid.scss';
import CharacterAvatar from './CharacterAvatar';
import useStore from '../../hooks/useStore';

const CharacterGrid = ({ className }) => {
  const { store } = useStore();
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
