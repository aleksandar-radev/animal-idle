import React from 'react'
import MainMenu from './MainMenu'
import './Container.scss'
import ResourceBar from './ResourceBar'
import MainScreen from './MainScreen'

const Container = () => {
  return (
    <div className={'Container'}>
      <ResourceBar></ResourceBar>
      <MainMenu></MainMenu>
      <MainScreen></MainScreen>
    </div>
  )
}

export default Container