import HealthBar from '../HealthBar';
import ManaBar from '../ManaBar';
import './CharacterResources.scss';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';

const CharacterResources = ({ className }) => {
  const cm = useCharacterMethods();

  return (
    <div className={['CharacterResources', className].join(' ')}>
      <HealthBar currentHealth={cm.getCurrentHealth()} totalHealth={cm.getTotalHealth()}></HealthBar>

      <ManaBar currentMana={cm.getCurrentMana()} totalMana={cm.getTotalMana()}></ManaBar>
    </div>
  );
};

export default CharacterResources;
