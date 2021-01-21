import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from './assets/logo.svg'
import Portis from '@portis/web3'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { MetaMaskButton } from 'rimble-ui'
import Wallet_model from './Wallet_model'

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
  top: 2.7%;
  left: 75%;
  background: #ffffff;
  border: 2px solid #4e3fce;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.7rem 1.2rem;
  font-family: 'Questrial', sans-serif;
  font-size: 24px;
`
const H1Div = styled.div`
  text-align: center;
  border-radius: 0px 0px 70px 70px;
  height: 80px;
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

const H1 = styled.h1`
  display: inline-block;
  font-size: 2.2rem;
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  vertical-align: middle;
  margin-top: 0.5rem;
  line-height: normal;
`

const NavbarImg = styled.img``

const NavBar = ({ imgSource, titleText }) => {
  const { web3Loading, getweb3 } = Wallet_model()
  const [myWeb3, setMyWeb3] = useState()
  // const portis = new Portis('f93ee87a-6e6b-4c92-a394-ef5e494c82f6', 'rinkeby');

  async function connectWallet() {
    if (myWeb3 === undefined) {
      await getweb3().then((response) => {
        setMyWeb3(response)

        response.eth.getAccounts().then((result) => {
          console.log(result)
        })
      })
    }
  }

  // function getAcc(){
  //     if (myWeb3 === undefined){
  //         const web3 = new Web3(portis.provider)
  //         setMyWeb3(web3);
  //         web3.eth.getAccounts((error, accounts) => {
  //         console.log(accounts);});
  //
  //     }
  //
  // }

  return (
    <div>
      <Link to={'/'}>
        <img src={logo} style={{ width: '500px' }} />
      </Link>
      {web3Loading ? (
        <WalletButton disabled>Loading...</WalletButton>
      ) : (
        <WalletButton onClick={connectWallet}>Connect Wallet</WalletButton>
      )}
      {/*<WalletButton onClick = {getAcc}>Log in with Portis</WalletButton>*/}
      <H1Div>
        {imgSource ? (
          <NavbarImg
            height='50%'
            style={{ position: 'relative', top: '10%', paddingRight: '1.5rem' }}
            src={imgSource}
          />
        ) : null}
        <H1>{titleText}</H1>
      </H1Div>
    </div>
  )
}

export default NavBar
