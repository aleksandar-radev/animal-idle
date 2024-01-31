import PropTypes from '../../externalLibraries/propTypes';
import HealthBar from '../HealthBar';
import ManaBar from '../ManaBar';
import './CharacterResources.scss';
import useStore from '../../hooks/useStore';

const CharacterResources = ({ className }) => {
  const { store } = useStore();

  return (
    <div className={['CharacterResources', className].join(' ')}>
      <HealthBar
        currentHealth={store.characters.getCurrentHealth()}
        totalHealth={store.characters.getTotalHealth()}></HealthBar>

      <ManaBar currentMana={store.characters.getCurrentMana()} totalMana={store.characters.getTotalMana()}></ManaBar>
    </div>
  );
};

CharacterResources.propTypes = {
  isSelf: PropTypes.bool,
  className: PropTypes.string,
};

export default CharacterResources;
