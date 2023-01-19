import React from 'react'
import CharacterAvatar from './CharacterAvatar'
import CharacterResources from './CharacterResources'
import FightLog from './FightLog'
import SkillsBar from './SkillsBar'
import './FightScreen.scss';

const FightScreen = () => {
    return (
        <div className={"FightScreen"}>
            <CharacterAvatar className={"FightScreen-self"}></CharacterAvatar>
            <CharacterResources className={"FightScreen-self_res"} isSelf={true}></CharacterResources>

            <FightLog className={"FightScreen-log"}></FightLog>

            <CharacterAvatar className={"FightScreen-enemy"}></CharacterAvatar>
            <CharacterResources className={"FightScreen-enemy_res"}></CharacterResources>

            <SkillsBar className={"FightScreen-skills"}></SkillsBar>
        </div>
    )
}

export default FightScreen