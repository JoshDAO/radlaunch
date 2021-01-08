import React, { Component } from 'react'
import styled from 'styled-components'
import farmer from './assets/RADlogo.svg'

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: auto;
  border-bottom: 3px solid gray;
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
    <Nav>
      <img src={farmer} width={200} />
      <Ul>
        <li>
          <a style={{ textDecoration: 'none', color: 'black', fontSize: 30 }} href=''>
            How does it work?
          </a>
        </li>
        <li>
          <a style={{ textDecoration: 'none', color: 'black', fontSize: 30 }} href=''>
            Docs
          </a>
        </li>
        <li>
          <WalletButton>Connect Wallet</WalletButton>
        </li>
      </Ul>
    </Nav>
  )
}

export default NavBar
