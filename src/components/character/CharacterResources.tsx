import HealthBar from '../HealthBar';
import ManaBar from '../ManaBar';
import './CharacterResources.scss';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';

const CharacterResources = ({ className }) => {
  const characters = useCharacterMethods();

  return (
    <div className={['CharacterResources', className].join(' ')}>
      <HealthBar currentHealth={characters.getCurrentHealth()} totalHealth={characters.getTotalHealth()}></HealthBar>

      <ManaBar currentMana={characters.getCurrentMana()} totalMana={characters.getTotalMana()}></ManaBar>
    </div>
  );
};

export default CharacterResources;
