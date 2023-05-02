import React, { useContext, useState } from 'react';
import { State } from '../api/Store';
import PropTypes from '../externalLibraries/propTypes';
import './CharacterResources.scss';
import HealthBar from './HealthBar';
import ManaBar from './ManaBar';

const CharacterResources = (props) => {
  const [store] = useContext(State);
  const [character] = useState(store.character);

  return (
    <div className={['CharacterResources', props.className].join(' ')}>
      {props.isSelf ? (
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
          currentHealth={store.enemy.current?.currentHealth}
          totalHealth={store.enemy.current?.totalHealth}></HealthBar>
      )}
    </div>
  );
};

CharacterResources.propTypes = {
  isSelf: PropTypes.bool,
  className: PropTypes.string,
};

export default CharacterResources;
