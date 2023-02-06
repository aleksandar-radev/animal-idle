import React from 'react';
import CharacterAvatar from '../../components/CharacterAvatar';
import CharacterResources from '../../components/CharacterResources';
import FightLog from '../../components/FightLog';
import SkillsBar from '../../components/SkillsBar';
import './FightScreen.scss';

const FightScreen = () => {
  return (
    <div className={'FightScreen'}>
      <CharacterAvatar className={'FightScreen-self'}></CharacterAvatar>
      <CharacterResources className={'FightScreen-self_res'} isSelf={true}></CharacterResources>

      <FightLog className={'FightScreen-log'}></FightLog>

      <CharacterAvatar className={'FightScreen-enemy'}></CharacterAvatar>
      <CharacterResources className={'FightScreen-enemy_res'}></CharacterResources>

      <SkillsBar className={'FightScreen-skills'}></SkillsBar>
    </div>
  );
};

export default FightScreen;
