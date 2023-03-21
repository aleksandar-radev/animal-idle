import React, { useContext } from 'react';
import { State } from '../api/Store';
import PropTypes from '../externalLibraries/propTypes';
import './CharacterResources.scss';
import HealthBar from './HealthBar';
import ManaBar from './ManaBar';

const CharacterResources = (props) => {
  const [store] = useContext(State);

  return (
    <div className={['CharacterResources', props.className].join(' ')}>
      <HealthBar
        currentHealth={store.enemy.currentHealth}
        totalHealth={store.enemy.totalHealth}></HealthBar>

      {props.isSelf ? <ManaBar></ManaBar> : null}
    </div>
  );
};

CharacterResources.propTypes = {
  isSelf: PropTypes.bool,
  className: PropTypes.string,
};

export default CharacterResources;
