import React from 'react'
import HealthBar from './HealthBar'
import ManaBar from './ManaBar'
import './CharacterResources.scss'

const CharacterResources = (props) => {
  return (
    <div className={['CharacterResources', props.className].join(' ')}>
      <HealthBar></HealthBar>

      {props.isSelf ? <ManaBar></ManaBar> : null}
    </div>
  )
}

CharacterResources.defaultProps = {
  isSelf: false,
}

export default CharacterResources