import React from 'react';
import './CharacterSkills.scss';
import useStore from '../../hooks/useStore';
import CharacterSkill from './CharacterSkill';

const CharacterSkills = () => {
  const { store } = useStore();
  const activeCharacter = store.characters.getActiveCharacter();

  return (
    <div className="CharacterSkills">
      <div className="attack">
        {activeCharacter.getAllAttackPassiveSkills().map((skill) => {
          console.log(skill);
          return <CharacterSkill key={skill.getName()} skill={skill}></CharacterSkill>;
        })}
      </div>
      <div className="defense">asdf</div>
      <div className="utility">asdf</div>
    </div>
  );
};

export default CharacterSkills;
