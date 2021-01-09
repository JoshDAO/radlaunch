import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from './NavBar'
import Landing from './Landing'
import DeveloperIndex from './developers/DeveloperIndex'
import SelectICO from './developers/SelectIco'
import IbcoSetupForm from './developers/IbcoSetupForm'

function App() {
  return (
    <div
      style={{ width: '60%', margin: 'auto', height: '100vh', textAlign: 'center' }}
      className='App'
    >
      <NavBar />
      <Router>
        <Switch>
          <Route exact path='/developer'>
            <DeveloperIndex />
          </Route>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route exact path='/SetUpIco'>
            <SelectICO />
          </Route>
          <Route exact path='/IbcoSetup'>
            <IbcoSetupForm />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
