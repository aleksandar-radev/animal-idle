import React, { useContext, useState } from 'react';
import { State } from '../api/Store';
import PropTypes from '../externalLibraries/propTypes';
import './CharacterResources.scss';
import HealthBar from './HealthBar';
import ManaBar from './ManaBar';

const CharacterResources = ({ className, isSelf }) => {
  const [store] = useContext(State);
  const [character] = useState(store.character);

  return (
    <div className={['CharacterResources', className].join(' ')}>
      {isSelf ? (
        <>
          <HealthBar
            currentHealth={character.getCurrentHealth()}
            totalHealth={character.getTotalHealth()}></HealthBar>

          <ManaBar
            currentMana={character.getCurrentMana()}
            totalMana={character.getTotalMana()}></ManaBar>
        </>
      ) : (
        <HealthBar
          currentHealth={store.enemy.current?.getCurrentHealth()}
          totalHealth={store.enemy.current?.getTotalHealth()}></HealthBar>
      )}
    </div>
  );
};

CharacterResources.propTypes = {
  isSelf: PropTypes.bool,
  className: PropTypes.string,
};

export default CharacterResources;
