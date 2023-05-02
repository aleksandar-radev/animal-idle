import { useContext, useState } from 'react';
import { State } from '../../api/Store';
import PropTypes from '../../externalLibraries/propTypes';
import HealthBar from '../HealthBar';
import ManaBar from '../ManaBar';
import './CharacterResources.scss';

const CharacterResources = ({ className }) => {
  const [store] = useContext(State);
  const [character] = useState(store.character);

  return (
    <div className={['CharacterResources', className].join(' ')}>
      <HealthBar
        currentHealth={character.getCurrentHealth()}
        totalHealth={character.getTotalHealth()}></HealthBar>

      <ManaBar
        currentMana={character.getCurrentMana()}
        totalMana={character.getTotalMana()}></ManaBar>
    </div>
  );
};

CharacterResources.propTypes = {
  isSelf: PropTypes.bool,
  className: PropTypes.string,
};

export default CharacterResources;
