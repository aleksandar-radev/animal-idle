import React from 'react';
import PropTypes from '../../helpers/externalLibraries/propTypes';
import './CharacterGrid.scss';
import CharacterAvatar from './CharacterAvatar';
import useStore from '../../hooks/useStore';

const CharacterGrid = ({ className }) => {
  const { store } = useStore();
  const characters = store.characters.getCharactersInActiveDeck();

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

CharacterGrid.propTypes = {
  className: PropTypes.string,
};

export default CharacterGrid;
