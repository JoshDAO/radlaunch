import React, { Component } from 'react'
import styled from 'styled-components'
import farmer from './assets/farmer.jpg'

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-evenly;
  margin: auto;
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
  font-size: 30;
`

const NavBar = (props) => {
  return (
    <Nav>
      <img src={farmer} width={200} />
      <Ul>
        <li>
          <a style={{ textDecoration: 'none', color: 'black' }} href=''>
            How does it work?
          </a>
        </li>
        <li>
          <a style={{ textDecoration: 'none', color: 'black' }} href=''>
            Docs
          </a>
        </li>
        <li>
          <button>Connect Wallet</button>
        </li>
      </Ul>
    </Nav>
  )
}

export default NavBar
