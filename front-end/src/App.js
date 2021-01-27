import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Web3 from 'web3'

import NavBar from './NavBar'
import Landing from './Landing'
import DeveloperIndex from './developers/DeveloperIndex'
import InvestorIndex from './investors/Index'
import SelectICO from './developers/SelectIco'
import IbcoSetupForm from './developers/IbcoSetupForm'
import IndividualListing from './investors/individualListing'

function App() {
  const [myWeb3, setMyWeb3] = useState()
  const [accounts, setAccounts] = useState()
  const [chainId, setChainId] = useState()
  const [launchedICOs, setLaunchedICOs] = useState([])

  return (
    <div
      style={{
        width: '100%',
        margin: 'auto',
        height: window.innerHeight,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
      className='App'
    >
      <Router>
        <Switch>
          <Route exact path='/developer'>
            <DeveloperIndex
              myWeb3={myWeb3}
              setMyWeb3={setMyWeb3}
              accounts={accounts}
              setAccounts={setAccounts}
              chainId={chainId}
              setChainId={setChainId}
            />
          </Route>
          <Route exact path='/'>
            <Landing
              myWeb3={myWeb3}
              setMyWeb3={setMyWeb3}
              accounts={accounts}
              setAccounts={setAccounts}
              chainId={chainId}
              setChainId={setChainId}
            />
          </Route>
          <Route exact path='/SetUpIco'>
            <SelectICO />
          </Route>
          <Route exact path='/IbcoSetup'>
            <IbcoSetupForm
              myWeb3={myWeb3}
              setMyWeb3={setMyWeb3}
              accounts={accounts}
              setAccounts={setAccounts}
              chainId={chainId}
              setChainId={setChainId}
            />
          </Route>
          <Route exact path='/investor'>
            <InvestorIndex
              myWeb3={myWeb3}
              setMyWeb3={setMyWeb3}
              accounts={accounts}
              setAccounts={setAccounts}
              chainId={chainId}
              setChainId={setChainId}
              launchedICOs={launchedICOs}
              setLaunchedICOs={setLaunchedICOs}
            />
          </Route>
          <Route exact path='/investor/:address'>
            <IndividualListing
              myWeb3={myWeb3}
              setMyWeb3={setMyWeb3}
              accounts={accounts}
              setAccounts={setAccounts}
              chainId={chainId}
              setChainId={setChainId}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
