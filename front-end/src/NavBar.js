import React, { Component } from 'react'
import styled from 'styled-components'
import logo from './assets/logo.svg'
import Portis from '@portis/web3'
import Web3 from 'web3'
import {useEffect, useState} from "react";
import { MetaMaskButton } from 'rimble-ui'
import Wallet_model from "./Wallet_model";



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
    const {web3Loading, getweb3} = Wallet_model ();
    const [myWeb3, setMyWeb3] = useState ();
    const portis = new Portis('f93ee87a-6e6b-4c92-a394-ef5e494c82f6', 'rinkeby');
    const web3 = new Web3(portis.provider);
async function connectWallet() {
    await getweb3 ().then ((response) => {
        setMyWeb3 (response);
        response.eth.getAccounts ().then ((result) => {
        console.log (result)
        });
    });
};

function getAcc(){
web3.eth.getAccounts((error, accounts) => {
  console.log(accounts);
});}

  return (
    <div>
      <img src={logo} style={{ width: '650px' }} />
        {web3Loading? <WalletButton disabled>Loading...</WalletButton>: <WalletButton onClick = {connectWallet}>Connect Wallet</WalletButton> }
        {/*<WalletButton onClick = {getAcc()}>Portis</WalletButton>*/}
    </div>
  )
}

export default NavBar
