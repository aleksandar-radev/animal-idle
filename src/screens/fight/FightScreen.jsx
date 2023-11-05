import { State } from '../../api/Store';
import FightLog from '../../components/FightLog';
import SkillsBar from '../../components/SkillsBar';
import CharacterAvatar from '../../components/character/CharacterAvatar';
import CharacterResources from '../../components/character/CharacterResources';
import EnemyAvatar from '../../components/enemy/EnemyAvatar';
import EnemyResources from '../../components/enemy/EnemyResources';
import './FightScreen.scss';
import useEnemyAttack from '../../hooks/useEnemyAttack';
import { useContext } from 'react';
import useInitFight from '../../hooks/useInitFight';
import useCharactersAttack from '../../hooks/useCharactersAttack';

const FightScreen = () => {
  const [store] = useContext(State);
  useInitFight();
  useEnemyAttack();
  useCharactersAttack();

  return (
    <div className={'FightScreen'}>
      {store.settings.isFightStarted ? (
        <>
          <CharacterAvatar className={'FightScreen-self'} />
          <CharacterResources className={'FightScreen-self-res'} />
          <FightLog className={'FightScreen-log'} />
          <EnemyAvatar className={'FightScreen-enemy'} />
          <EnemyResources className={'FightScreen-enemy-res'} />
          <SkillsBar className={'FightScreen-skills'} />
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default FightScreen;
