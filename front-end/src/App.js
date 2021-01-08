import './App.css'
import React from 'react'
import NavBar from './NavBar'
import Landing from './Landing'

function App() {
  return (
    <div style={{ width: '60%', margin: 'auto', height: '100vh' }} className='App'>
      <NavBar />
      <Landing />
    </div>
  )
}

export default App
