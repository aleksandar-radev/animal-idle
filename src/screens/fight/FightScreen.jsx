import FightLog from '../../components/FightLog';
import ActiveSkillsBar from '../../components/ActiveSkillsBar';
import CharacterResources from '../../components/character/CharacterResources';
import EnemyAvatar from '../../components/enemy/EnemyAvatar';
import EnemyResources from '../../components/enemy/EnemyResources';
import './FightScreen.scss';
import useEnemyAttack from '../../hooks/useEnemyAttack';
import useInitFight from '../../hooks/useInitFight';
import useCharactersAttack from '../../hooks/useCharactersAttack';
import CharacterGrid from '../../components/character/CharacterGrid';
import useStore from '../../hooks/useStore';

const FightScreen = () => {
  const { store } = useStore();
  useInitFight();
  useEnemyAttack();
  useCharactersAttack();

  return (
    <div className={'FightScreen'}>
      {store.settings.isFightStarted ? (
        <>
          <CharacterGrid className={'FightScreen-self'} />
          <CharacterResources className={'FightScreen-self-res'} />
          <FightLog className={'FightScreen-log'} />
          <EnemyAvatar className={'FightScreen-enemy'} />
          <EnemyResources className={'FightScreen-enemy-res'} />
          <ActiveSkillsBar className={'FightScreen-skills'} />
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default FightScreen;
