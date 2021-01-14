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

const WalletButton = styled.button`
  position: absolute;
  top: 4.5%;
  left: 75%;
  background: #ffffff;
  border: 2px solid #4e3fce;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.7rem 1.2rem;
  font-family: 'Questrial', sans-serif;
  font-size: 24px;
`
const H1 = styled.h1`
  font-size: 48px;
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  border-radius: 0px 0px 70px 70px;
  height: 150px;
  line-height: 110px;
  width: 100%;
  margin: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 148, 255, 0) 69.27%,
    rgba(0, 148, 255, 0.5) 73.96%,
    rgba(78, 63, 206, 0.5) 83.33%,
    rgba(220, 27, 27, 0.5) 100%
  );
`
const NavBar = (props) => {
  return (
    <div width='100%'>
      <img src={logo} style={{ width: '650px', margin: 'auto' }} />
      <WalletButton>Connect Wallet</WalletButton>
      <H1>Reliable, Secure and Permissionless launches for pioneering projects </H1>
    </div>
  )
}

export default NavBar
