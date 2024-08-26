import './CharacterResources.scss';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import HealthBar from '@/ui/components/general/HealthBar';
import ManaBar from '@/ui/components/general/ManaBar';

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
