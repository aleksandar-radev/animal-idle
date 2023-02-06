import React from 'react'
import './CharacterScreen.scss';
import CharacterScreenMenu from './CharacterScreenMenu';
import CharacterAvatar from '../../components/CharacterAvatar';
import CharacterStats from '../../components/CharacterStats';

const CharacterScreen = () => {



    return (
        <div className={'CharacterScreen'}>
            <CharacterScreenMenu></CharacterScreenMenu>
            <CharacterAvatar></CharacterAvatar>
            <CharacterStats></CharacterStats>

        </div>
    )
}

export default CharacterScreen