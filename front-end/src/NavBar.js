import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from './assets/logo.svg'
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
  const [contract, setContract] = useState()
  const [tokenContract, setTokenContract] = useState()
  const [accounts, setAccount] = useState()
  const [chainId, setChainId] = useState()
  const [dynInput, setDynInput] = useState()
  const [template, setTemplate] = useState()

  async function connectWallet() {
    if (myWeb3 === undefined) {
      await getweb3().then((response) => {
        setMyWeb3(response)
        response.eth.getAccounts().then((result) => {
          console.log(result)
          setAccount(result)
        })

        response.eth.getChainId().then((answer) => {
          console.log(answer)
          setChainId(answer)
        })
        console.log(myWeb3)
      })
    }
  }
  async function loadInitialContracts() {
    // if (chainId <= 42){
    //     return
    // }

    const dyn = await loadContract('42', 'DynPoolFactory')
    const token = await loadContract('42', 'ERCToken')

    setContract(dyn)
    setTokenContract(token)
  }

  async function loadContract(chain, contractName) {
    // Load a deployed contract instance into a web3 contract object
    // const {web3} = this.state

    // Get the address of the most recent deployment from the deployment map
    let address
    try {
      address = map[chain][contractName][0]
    } catch (e) {
      console.log(`Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`)
      return undefined
    }

    // Load the artifact with the specified address
    let contractArtifact
    try {
      contractArtifact = await import(`./artifacts/deployments/${chain}/${address}.json`)
    } catch (e) {
      console.log(
        `Failed to load contract artifact "./artifacts/deployments/${chain}/${address}.json"`,
      )
      return undefined
    }
    console.log(contractArtifact)

    return new myWeb3.eth.Contract(contractArtifact.abi, address)
  }

  async function loadTemplate(chain, contractName) {
    // Load a deployed contract instance into a web3 contract object
    // const {web3} = this.state

    // Get the address of the most recent deployment from the deployment map
    let address
    try {
      address = map[chain][contractName][0]
    } catch (e) {
      console.log(`Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`)
      return undefined
    }

    // Load the artifact with the specified address
    let contractArtifact
    try {
      contractArtifact = await import(`./artifacts/deployments/${chain}/${address}.json`)
    } catch (e) {
      console.log(
        `Failed to load contract artifact "./artifacts/deployments/${chain}/${address}.json"`,
      )
      return undefined
    }
    console.log(contractArtifact)

    return new myWeb3.eth.Contract(
      contractArtifact.abi,
      '0x3072A4ad44C12CfBf42DDC9cd37307327Fb57F19',
    )
  }

  async function deployICO(e) {
    e.preventDefault()
    // const value = parseInt(dynInput)
    // if (isNaN(value)) {
    //     alert("invalid value")
    //     return
    // }
    let supply = myWeb3.utils.toWei('100', 'ether')
    let minimalProv = myWeb3.utils.toWei('0.5', 'ether')
    let value = myWeb3.utils.toWei('0.1', 'ether')
    await tokenContract.methods
      .increaseAllowance(contract.options.address, supply)
      .send({ from: accounts[0] })
    await contract.methods
      .deployIBCO(
        '0xE754870e821c5BE488C9C48B4ff707978D4fEd2C',
        supply,
        1611196800,
        1611232800,
        minimalProv,
      )
      .send({ from: accounts[0], value: value })
      .on('receipt', async () => {})
  }
  async function events() {
    await contract.getPastEvents('IBCODeployed', { fromBlock: 1 }).then((response) => {
      console.log(response)
    })
    const loadedTemplate = await loadTemplate('42', 'IBCOTemplate')
    setTemplate(loadedTemplate)
  }

  async function claim() {
    await template.methods
      .claim()
      .send({ from: accounts[0] })
      .on('receipt', async () => {})
  }

  async function numProviders() {
    await template.methods
      .numberOfProviders()
      .send({ from: accounts[0] })
      .on('receipt', async () => {})
  }

  async function contribute() {
    await myWeb3.eth
      .sendTransaction({
        from: accounts[0],
        to: template.options.address,
        value: myWeb3.utils.toWei('0.1', 'ether'),
      })
      .on('receipt', async () => {})
  }

  return (
    <div>
      <button onClick={loadInitialContracts}>Load Contracts</button>
      <Link to={'/'}>
        <img src={logo} style={{ width: '500px' }} />
      </Link>
      {web3Loading ? (
        <WalletButton disabled>Loading...</WalletButton>
      ) : (
        <WalletButton onClick={connectWallet}>Connect Wallet</WalletButton>
      )}
      <WalletButton onClick={deployICO}>Launch</WalletButton>

      <H1Div>
        <button onClick={events}>show events</button>
        {imgSource ? (
          <NavbarImg
            height='50%'
            style={{ position: 'relative', top: '10%', paddingRight: '1.5rem' }}
            src={imgSource}
          />
        ) : null}
        <button onClick={claim}>Claim call</button>
        <button onClick={contribute}>Contribute</button>
        <button onClick={numProviders}>Number of Providers</button>
        <H1>{titleText}</H1>
      </H1Div>
    </div>
  )
}

export default NavBar
