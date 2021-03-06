import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from './assets/logo.svg'
import ethLogo from './assets/ethLogo.svg'
import Portis from '@portis/web3'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { MetaMaskButton } from 'rimble-ui'
import Wallet_model from './Wallet_model'
import map from './artifacts/deployments/map.json'
import template from './artifacts/contracts/IBCOTemplate.json'

const Nav = styled.nav`
  display: flex;
  width: 1920px;
  flex-direction: row;
  justify-content: space-evenly;
  margin: auto;
  border-bottom: 3px solid rgb(113, 101, 215);
  margin-bottom: 4rem;
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
  margin-top: 1rem;
  line-height: normal;
`

const NavbarImg = styled.img``

const NavBar = ({
  imgSource,
  titleText,
  myWeb3,
  setMyWeb3,
  accounts,
  setAccounts,
  chainId,
  setChainId,
}) => {
  const { web3Loading, getweb3 } = Wallet_model()

  const [dynInput, setDynInput] = useState()
  const [template, setTemplate] = useState()

  async function connectWallet() {
    if (myWeb3 === undefined) {
      await getweb3().then((response) => {
        setMyWeb3(response)
        response.eth.getAccounts().then((result) => {
          console.log(result)
          setAccounts(result)
        })

        response.eth.getChainId().then((answer) => {
          console.log(answer)
          setChainId(answer)
        })
        console.log(myWeb3)
      })
    }
  }

  return (
    <div>
      <img src={ethLogo} style={{ width: '75px', position: 'absolute', top: '2.7%', left: '5%' }} />{' '}
      <Link to={'/'}>
        <img src={logo} style={{ width: '450px' }} />
      </Link>
      {web3Loading ? (
        <WalletButton disabled>Loading...</WalletButton>
      ) : (
        <WalletButton onClick={connectWallet}>
          {accounts
            ? accounts[0]
                .substr(0, 5)
                .concat('...')
                .concat(accounts[0].substring(accounts[0].length - 4))
            : 'Connect Wallet'}
        </WalletButton>
      )}
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
