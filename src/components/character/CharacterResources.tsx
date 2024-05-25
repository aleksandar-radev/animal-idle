import PropTypes from '../../helpers/externalLibraries/propTypes';
import HealthBar from '../HealthBar';
import ManaBar from '../ManaBar';
import './CharacterResources.scss';
import useStore from '../../hooks/useStore';

const CharacterResources = ({ className }) => {
  const { data } = useStore();

  return (
    <div className={['CharacterResources', className].join(' ')}>
      <HealthBar
        currentHealth={data.characters.getCurrentHealth()}
        totalHealth={data.characters.getTotalHealth()}></HealthBar>

      <ManaBar currentMana={data.characters.getCurrentMana()} totalMana={data.characters.getTotalMana()}></ManaBar>
    </div>
  );
};

export default CharacterResources;
