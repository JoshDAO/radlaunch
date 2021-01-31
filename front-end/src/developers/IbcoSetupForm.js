import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Field, Button, Text } from 'rimble-ui'
import NavBar from '../NavBar'
import Web3 from 'web3'
import map from '../artifacts/deployments/map.json'
import template from '../artifacts/contracts/IBCOTemplate.json'
import { icoSubmit } from '../utils/apiCalls'

const TypeButton = styled.button`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  text-align: left;
  background: #e6ddff;
  border: 2px solid #4e3fce;
  box-sizing: border-box;
  border-radius: 2rem;
  width: 15rem;
  height: 5rem;
  cursor: pointer;
  margin: 1rem 2rem 1rem 0;
  padding: 1rem;
`

const IbcoSetupForm = ({ myWeb3, setMyWeb3, accounts, setAccounts, chainId, setChainId }) => {
  const [submitted, setSubmitted] = useState(false)
  const [validated, setValidated] = useState(false)
  const [startDateInFuture, setStartDateInFuture] = useState(true)
  const [endAfterStart, setEndAfterStart] = useState(true)
  const [tokenAddress, setTokenAddress] = useState('')
  const [tokenSupply, setTokenSupply] = useState('')
  const [minimumThreshold, setMinimumThreshold] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  const validateForm = () => {
    if (Date.now() > Date.parse(startDate)) {
      setStartDateInFuture(false)
      setValidated(false)
    } else {
      setStartDateInFuture(true)
    }
    if (Date.parse(startDate) >= Date.parse(endDate)) {
      setEndAfterStart(false)
      setValidated(false)
    } else {
      setEndAfterStart(true)
    }
    if (Date.parse(startDate) < Date.parse(endDate) && Date.now() <= Date.parse(startDate)) {
      setValidated(true)
    }
  }

  const handleTokenAddressInput = (e) => {
    setTokenAddress(e.target.value)
    validateInput(e)
  }
  const handleTokenSupplyInput = async (e) => {
    await setTokenSupply(parseInt(e.target.value))
    if (Number.isInteger(tokenSupply)) {
      validateInput(e)
    }
  }
  const handleMinimumThresholdInput = async (e) => {
    await setMinimumThreshold(e.target.value)
    validateInput(e)
  }

  const handleStartDateInput = (e) => {
    setStartDate(e.target.value)
    validateInput(e)
  }
  const handleEndDateInput = (e) => {
    setEndDate(e.target.value)
    validateInput(e)
  }
  const handleProjectDescriptionInput = (e) => {
    setProjectDescription(e.target.value)
    validateInput(e)
  }

  const validateInput = (e) => {
    e.target.parentNode.classList.add('was-validated')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    validateForm()
    const factory = await loadInitialFactory()
    const token = await loadInitialToken(tokenAddress)
    const receipt = await deployICO(factory, token)
    console.log('contract address   ', receipt.events.IBCODeployed.returnValues[1])
    const contractAddress = receipt.events.IBCODeployed.returnValues[1]
    await icoSubmit(accounts[0], projectDescription, tokenAddress, contractAddress)
  }

  // blockchain code /////////////////////////////////////////////////////////////////////////////////////

  const [factory, setFactory] = useState()
  const [tokenContract, setTokenContract] = useState()

  async function loadInitialToken(addr) {
    // if (chainId <= 42){
    //     return
    // }

    const token = await loadTemplate('42', 'ERCToken', addr)
    console.log('token:  ,', token)
    setTokenContract(token)
    return token
  }

  async function loadInitialFactory() {
    // if (chainId <= 42){
    //     return
    // }

    const dyn = await loadContract('42', 'DynPoolFactory')
    setFactory(dyn)
    return dyn
  }

  async function loadTemplate(chain, contractName, addr) {
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
      contractArtifact = await import(`../artifacts/deployments/${chain}/${address}.json`)
    } catch (e) {
      console.log(
        `Failed to load contract artifact "../artifacts/deployments/${chain}/${address}.json"`,
      )
      return undefined
    }
    console.log(contractArtifact)

    return new myWeb3.eth.Contract(contractArtifact.abi, addr)
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
      contractArtifact = await import(`../artifacts/deployments/${chain}/${address}.json`)
    } catch (e) {
      console.log(
        `Failed to load contract artifact "../artifacts/deployments/${chain}/${address}.json"`,
      )
      return undefined
    }
    console.log(contractArtifact)

    return new myWeb3.eth.Contract(contractArtifact.abi, address)
  }

  async function deployICO(factory, tokenContract) {
    // const value = parseInt(dynInput)
    // if (isNaN(value)) {
    //     alert("invalid value")
    //     return
    // }
    let supply = myWeb3.utils.toWei(tokenSupply.toString(), 'ether')
    let minimalProv = myWeb3.utils.toWei(minimumThreshold.toString(), 'ether')
    let value = myWeb3.utils.toWei('0.1', 'ether')
    await tokenContract.methods
      .increaseAllowance(factory.options.address, supply)
      .send({ from: accounts[0] })
    console.log(startDate)
    return await factory.methods
      .deployIBCO(
        tokenAddress,
        supply,
        Date.parse(startDate) / 1000,
        Date.parse(endDate) / 1000,
        minimalProv,
      )
      .send({ from: accounts[0], value: value })
      .on('receipt', async (receipt) => {
        console.log('receipt:   ', receipt)
        return receipt
      })
  }

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <NavBar
        titleText={'Type'}
        myWeb3={myWeb3}
        setMyWeb3={setMyWeb3}
        accounts={accounts}
        setAccounts={setAccounts}
        chainId={chainId}
        setChainId={setChainId}
      />
      <div
        style={{ width: '70%', margin: '0 auto', justifyContent: 'flex-start', display: 'flex' }}
      >
        <TypeButton>Dynamic Swap Pool / IBCO Public</TypeButton>
        {/* <TypeButton style={{ backgroundColor: 'white' }}>
          Dynamic Swap Pool / IBCO Private Whitelist
        </TypeButton> */}
      </div>
      <Form
        style={{
          border: '1px solid #4E3FCE',
          borderRadius: '2rem',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Questrial', sans-serif",
          fontWeight: 400,
          fontSize: '1rem',
          width: '70%',
          margin: '0 auto',
          padding: '2rem 0',
        }}
        onSubmit={handleSubmit}
        validated={validated}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
            }}
          >
            <Field
              style={{
                marginLeft: '7rem',
                width: '70%',
              }}
            >
              <label for='address-input' style={{ paddingBottom: '0.5rem' }}>
                Token Address - ERC20 Compatible token to list{' '}
              </label>
              <Input
                id='address-input'
                type='text'
                required={true}
                onChange={handleTokenAddressInput}
                value={tokenAddress}
                style={{ width: '100%' }}
              />
            </Field>
            <Field
              style={{
                marginLeft: '7rem',
                width: '70%',
              }}
            >
              <label for='token-input' style={{ paddingBottom: '0.5rem' }}>
                Token supply - number of tokens to be listed for sale
              </label>
              <Input
                id='token-input'
                type='text'
                required={true}
                onChange={handleTokenSupplyInput}
                value={tokenSupply || ''}
                style={{ width: '100%' }}
              />
            </Field>
            <Field
              style={{
                marginLeft: '7rem',
                width: '70%',
                fontFamily: "'Questrial', sans-serif",
                fontWeight: 400,
              }}
            >
              <label for='start-date' style={{ paddingBottom: '0.5rem' }}>
                Start date:
              </label>
              <Input
                id='start-date'
                type='datetime-local'
                required
                onChange={handleStartDateInput}
                value={startDate}
                style={{ width: '100%' }}
              />
            </Field>
            {submitted && !startDateInFuture ? (
              <Text style={{ color: 'red', fontSize: '1rem' }}>
                Your start date is in the past!
              </Text>
            ) : null}
            <Field style={{ marginLeft: '7rem', width: '70%' }}>
              <label for='end-date' style={{ paddingBottom: '0.5rem' }}>
                End date:
              </label>
              <Input
                id='end-date'
                type='datetime-local'
                required
                onChange={handleEndDateInput}
                value={endDate}
                style={{ width: '100%' }}
              />
            </Field>
            {submitted && !endAfterStart ? (
              <Text style={{ color: 'red', fontSize: '1rem' }}>
                Your end date is before your start date!
              </Text>
            ) : null}
            <Field style={{ marginLeft: '7rem', width: '70%' }}>
              <label for='min-threshold' style={{ paddingBottom: '0.5rem', textAlign: 'left' }}>
                Minimum Investment Threshold - tokens will only be distributed if your project
                raises more than this amount in ETH
              </label>
              <Input
                id='min-threshold'
                type='number'
                required
                onChange={handleMinimumThresholdInput}
                value={minimumThreshold}
                style={{ width: '100%' }}
              />
            </Field>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
            }}
          >
            <Text style={{ textAlign: 'left', padding: '0rem 3rem 2rem 3rem', fontSize: '1rem' }}>
              <strong>How does this launch type work? </strong>
              <br />
              <br />
              This launch type deploys a dynamic swap pool contract. In this kind of deployment the
              number of tokens to be sold are fixed, investors participate by committing ETH, thus
              increasing the price of 1 token in a linear fashion. <br />
              <br />
              At the end date the settlement price will be set, this price will be the same for all
              investors, regardless of when they invested in the project. This discourages any
              frontrunning and ensures that all investors are equal before a DEX launch for example.
              <br />
              <br />
              This launch type requires a minimum investment threshold, if your pool doesn’t reach
              that size then all investors are returned their investment and your tokens are
              returned to you.
            </Text>
            <Field
              style={{
                paddingLeft: '3rem',
                width: '90%',
                fontFamily: "'Questrial', sans-serif",
                fontWeight: 400,
                fontSize: '1rem',
              }}
            >
              <label
                for='project-description'
                style={{ paddingBottom: '0.5rem', textAlign: 'left' }}
              >
                Project Description - describe your project, provide links, token description etc.
                This can be updated on your My Launch page.
              </label>
              <textarea
                id='project-description'
                rows={2}
                cols='20'
                color='text'
                class='Box__StyledBox-ha1bw0-0 Input__StyledInput-vwozih-0 hllauP erlOXA sc-bwzfXH sc-cXWtzU iofgdJ'
                onChange={handleProjectDescriptionInput}
                value={projectDescription}
                style={{
                  height: '7rem',
                  width: '100%',
                  fontFamily: "'Questrial', sans-serif",
                  fontSize: '1rem',
                }}
              ></textarea>
            </Field>
          </div>
        </div>
        <Button
          type='submit'
          width='70%'
          style={{
            margin: 'auto',
            marginTop: '2rem',
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 400,
            fontSize: '1rem',
          }}
        >
          Review and Submit ICO for listing
        </Button>
      </Form>
    </div>
  )
}

export default IbcoSetupForm
