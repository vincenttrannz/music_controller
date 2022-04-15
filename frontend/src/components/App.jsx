import React from 'react'
import { Route, Switch } from "react-router-dom";
import Homepage from './Homepage'
import RoomJoinPage from './RoomJoinPage'
import CreateRoomPage from './CreateRoomPage'

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/join' component={RoomJoinPage}/>
      <Route exact path='/create' component={CreateRoomPage}/>
    </Switch>
  )
}
