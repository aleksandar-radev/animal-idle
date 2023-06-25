import { useContext, useEffect, useRef } from 'react';
import { State } from '../../api/Store';
import FightLog from '../../components/FightLog';
import SkillsBar from '../../components/SkillsBar';
import CharacterAvatar from '../../components/character/CharacterAvatar';
import CharacterResources from '../../components/character/CharacterResources';
import EnemyAvatar from '../../components/enemy/EnemyAvatar';
import EnemyResources from '../../components/enemy/EnemyResources';
import './FightScreen.scss';

const FightScreen = () => {
  const [store] = useContext(State);
  const fightShouldStop = useRef(false);

  useEffect(() => {
    startFight();
  }, []);

  useEffect(() => {
    fightShouldStop.current = false;
    return () => {
      fightShouldStop.current = true;
    };
  }, []);

  function startFight() {
    // TODO: add a death screen, during which no fighting will happen
    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (!store.enemy.current) {
        const randomEnemy = store.enemy.getRandomEnemy();
        store.enemy.current = randomEnemy;
      }

      if (fightShouldStop.current) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < store.enemy.current.atackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        store.character.takeDamage(store.enemy.current.getTotalDamage());
        startFight();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return (
    <div className={'FightScreen'}>
      <CharacterAvatar className={'FightScreen-self'}></CharacterAvatar>
      <CharacterResources className={'FightScreen-self-res'}></CharacterResources>

      <FightLog className={'FightScreen-log'}></FightLog>

      <EnemyAvatar className={'FightScreen-enemy'}></EnemyAvatar>
      <EnemyResources className={'FightScreen-enemy-res'}></EnemyResources>

      <SkillsBar className={'FightScreen-skills'}></SkillsBar>
    </div>
  );
};

export default FightScreen;
