import React, { Component } from 'react'
import styled from 'styled-components'
import logo from './assets/logo.svg'
import { MetaMaskButton } from 'rimble-ui'

const Nav = styled.nav`
  display: flex;
  width: 1920px;
  flex-direction: row;
  justify-content: space-evenly;
  margin: auto;
  border-bottom: 3px solid rgb(113, 101, 215);
  margin-bottom: 3rem;
`

const Ul = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 70%;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  color: black;
  text-decoration: none;
  list-style-type: none;
  font-size: 30px;
`

const WalletButton = styled.button`
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-size: 24px;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  background-color: HSL(271, 85%, 50%);
  color: white;
`

const NavBar = (props) => {
  return (
    <div>
      <img src={logo} style={{ width: '650px' }} />
      <WalletButton>{props.web3Provider ? 'Connect Wallet' : 'Log in with portis'}</WalletButton>
    </div>
  )
}

export default NavBar
