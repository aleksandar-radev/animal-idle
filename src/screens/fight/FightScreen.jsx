import React, { useContext, useEffect, useRef } from 'react';
import { State } from '../../api/Store';
import CharacterAvatar from '../../components/CharacterAvatar';
import CharacterResources from '../../components/CharacterResources';
import FightLog from '../../components/FightLog';
import SkillsBar from '../../components/SkillsBar';
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
        store.character.takeDamage();
        startFight();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return (
    <div className={'FightScreen'}>
      <CharacterAvatar className={'FightScreen-self'}></CharacterAvatar>
      <CharacterResources className={'FightScreen-self-res'} isSelf={true}></CharacterResources>

      <FightLog className={'FightScreen-log'}></FightLog>

      <CharacterAvatar className={'FightScreen-enemy'}></CharacterAvatar>
      <CharacterResources className={'FightScreen-enemy-res'}></CharacterResources>

      <SkillsBar className={'FightScreen-skills'}></SkillsBar>
    </div>
  );
};

export default FightScreen;
