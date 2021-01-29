import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../NavBar'
import investorsImage from '../assets/investorsImage.svg'
import styled from 'styled-components'
import map from '../artifacts/deployments/map'
import { fetchDatabaseInvestorData } from '../utils/apiCalls'
import { Input } from 'rimble-ui'

const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
`
const ProjectTitle = styled.h3`
  font-family: 'Questrial', sans-serif;
  font-size: 2.3rem;
  font-weight 400;
  margin-top: 0.4rem;
  text-align: left
`

const Column1 = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
`

const Column2 = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
  padding: 0 1rem;
`

const Column3 = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
`

const Button = styled.button`
  background: #ffffff;
  border: 2px solid #4e3fce;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.7rem;
  width: 100%;
  font-family: 'Questrial', sans-serif;
  font-size: 1rem;
`
const Span = styled.span`
  font-family: 'Questrial', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  margin-top: 2rem;
  text-align: left;
`

const ProjectImage = styled.img`
  width: 100%;
`

const Table = styled.table`
  width: 100%;
  text-align: left;
  border-spacing: 0;
  border-collapse: collapse;
`

const Td = styled.td`
  font-family: 'Questrial', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0.3rem;
  word-break: break-word;
`
const Tr = styled.tr`
  height: 3rem;
  border-top: 1px solid #e6ddff;
  &:first-of-type {
    border: none;
  }
`

const TableContainer = styled.div`
  border: 1px solid #e6ddff;
  border-radius: 10px;
  width: 100%;
`

const AboutSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 4rem;
  border-bottom: 3px solid #4e3fce;
  padding-bottom: 2rem;
`

const AboutTitle = styled.h4`
  font-family: 'Questrial', sans-serif;
  font-size: 1.8rem;
  font-weight 400;
  margin: 1rem 0;
  text-align: left
`

const EditButton = styled.button`
  background: #ffffff;
  border: 2px solid #4e3fce;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  height: 2.5rem;
  margin: 0.7rem 0 0 2rem;
  width: 6rem;
`
const AboutText = styled.p`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  text-align: left;
  font-size: 1.1rem;
`

const GraphContainer = styled.div`
  height: 20rem; //change this for graph size
  width: 40rem;
  margin: 2rem auto;
  background-color: salmon;
`

const IndividualListing = ({ myWeb3, setMyWeb3, accounts, setAccounts, chainId, setChainId }) => {
  const [ICOs, setICOs] = useState([])

  let { address } = useParams()
  console.log(typeof address)

  async function loadInitialFactory() {
    const dyn = await loadContract('42', 'DynPoolFactory')
    return dyn
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

  async function events(factory) {
    return await factory.getPastEvents('IBCODeployed', { fromBlock: 1 }).then((response) => {
      return response
    })
  }

  async function loadInitialTemplate(addr, contract) {
    // if (chainId <= 42){
    //     return
    // }

    const token = await loadTemplate('42', contract, addr)
    return token
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

  async function getExtraICOdata(template) {
    const numberOfProviders = await template.methods
      .numberOfProviders()
      .call()
      .then((result) => result)
    const amountRaised = await template.methods
      .totalProvided()
      .call()
      .then((result) => result)
    const yourContribution = await template.methods
      .provided(accounts[0])
      .call()
      .then((result) => result)

    return {
      numberOfProviders,
      amountRaised,
      yourContribution,
    }
  }

  async function getExtraTokendata(template) {
    const name = await template.methods
      .name()
      .call()
      .then((result) => result)
    const symbol = await template.methods
      .symbol()
      .call()
      .then((result) => result)
    const totalSupply = await template.methods
      .totalSupply()
      .call()
      .then((result) => result)

    return {
      name,
      symbol,
      totalSupply,
    }
  }

  useEffect(() => {
    const func = async () => {
      console.log('ICOs:   ', ICOs)
      if (myWeb3 === undefined || accounts === undefined) {
        return
      } else {
        const factory = await loadInitialFactory()
        const eventsArray = await events(factory)
        console.log('eventsArray:  ', eventsArray)
        const databaseData = await fetchDatabaseInvestorData(address)
        console.log('database Data:  ', databaseData)
        eventsArray
          .filter((event) => event['returnValues']['1'] === address)
          .forEach(async (event) => {
            console.log('event: ', event)
            const dbData = databaseData.data.filter(
              (ico) => ico.contractAddress === event.returnValues['1'],
            )
            console.log('dbdata:  ', dbData)
            const tokenContract = await loadInitialTemplate(event.returnValues['2'], 'ERCToken')
            const ICOContract = await loadInitialTemplate(event.returnValues['1'], 'IBCOTemplate')
            const extraIcoData = await getExtraICOdata(ICOContract)
            const extraTokenData = await getExtraTokendata(tokenContract)
            const projectData = [
              {
                ...extraIcoData,
                ...extraTokenData,
                contractAddress: event.returnValues['1'],
                startDate: event.returnValues.startDate * 1000,
                endDate: event.returnValues.endDate * 1000,
                tokenSupply: event.returnValues.tokenSupply,
                minimumRaiseAmount: event.returnValues.minimalProvide,
                tokenAddress: event.returnValues['2'],
                imageUrl: dbData[0].imageUrl || null,
                projectDescription: dbData[0].projectDescription,
                etherscanLink: 'https://kovan.etherscan.io/address/' + event.returnValues['1'],
                ICOContract: ICOContract,
              },
            ]
            console.log(projectData)

            setICOs((ICOs) => ICOs.concat(projectData))
          })
      }
    }
    func()
  }, [myWeb3, accounts])

  async function claim(template) {
    await template.methods
      .claim()
      .send({ from: accounts[0] })
      .on('receipt', async () => {})
  }

  return (
    <>
      <NavBar
        imgSource={investorsImage}
        titleText={'Investors - Participate in project launches'}
        myWeb3={myWeb3}
        setMyWeb3={setMyWeb3}
        accounts={accounts}
        setAccounts={setAccounts}
        chainId={chainId}
        setChainId={setChainId}
      />
      {ICOs.length ? (
        <div style={{ padding: '4rem 10% 0 10%' }}>
          <DashboardContainer>
            <Column1>
              <ProjectTitle>{ICOs[0].name}</ProjectTitle>
              <ProjectImage src={ICOs[0].imageUrl} />
            </Column1>
            <Column2>
              <Button>
                <a
                  href={ICOs[0].etherscanLink}
                  style={{ textDecoration: 'none', color: 'black' }}
                  target='_blank'
                >
                  View on Etherscan
                </a>
              </Button>
              <Span>Verified status: Verified</Span>
              <Span>Access: Public</Span>
              {Date.now() < ICOs[0].endDate && Date.now() > ICOs[0].startDate ? (
                <ContributeContainer
                  myWeb3={myWeb3}
                  accounts={accounts}
                  contractAddress={address}
                  template={ICOs[0].ICOContract}
                />
              ) : Date.now() > ICOs[0].endDate ? (
                <Button
                  style={{ marginTop: '2rem' }}
                  disabled={Date.now() < ICOs[0].endDate}
                  onClick={async () => {
                    const ICOContract = await loadInitialTemplate(
                      ICOs[0].contractAddress,
                      'IBCOTemplate',
                    )
                    claim(ICOContract)
                  }}
                >
                  {console.log('launched ICOs amountRaised', ICOs[0].amountRaised)}
                  {console.log('launched ICOs minimumRaiseAmount', ICOs[0].minimumRaiseAmount)}
                  {parseInt(ICOs[0].amountRaised) >= parseInt(ICOs[0].minimumRaiseAmount)
                    ? 'Withdraw Tokens'
                    : 'Withdraw ETH'}
                </Button>
              ) : (
                <Span>Launch has not started yet. Come back at the start time.</Span>
              )}
            </Column2>
            <Column3>
              <TableContainer>
                <Table>
                  <Tr>
                    <Td>
                      Contract address: <br /> <b>{ICOs[0].contractAddress}</b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Start/end date:
                      <br />{' '}
                      <b>
                        {new Date(ICOs[0].startDate).toString().substr(4, 20)} to{' '}
                        {new Date(ICOs[0].endDate).toString().substr(4, 24)}
                      </b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Tokens for sale: <b>{ICOs[0].tokenSupply / 1e18}</b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Amount raised: <b>{ICOs[0].amountRaised / 1e18}</b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Number of investors: <b>{ICOs[0].numberOfProviders}</b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Minimum raise amount: <b>{ICOs[0].minimumRaiseAmount / 1e18}</b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Your contribution: <b>{ICOs[0].yourContribution / 1e18}</b>
                    </Td>
                  </Tr>
                </Table>
              </TableContainer>
            </Column3>
            <Column3>
              <TableContainer>
                <Table>
                  <Tr>
                    <Td>
                      Token address:
                      <br />
                      <b>{ICOs[0].tokenAddress}</b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Token name: <b>{ICOs[0].name}</b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Token Symbol: <b>{ICOs[0].symbol}</b>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Total token supply: <b>{ICOs[0].totalSupply / 1e18}</b>
                    </Td>
                  </Tr>
                  <Tr style={{ height: '9rem' }}>
                    <Td>
                      Launch type: Dynamic swap pool
                      <br />
                      <br />
                      In this type of launch if the amount raised is above the minimum raise amount.
                      You will be allocated a percentage of the tokens for sale equivalent to your
                      percentage contribution of the Amount raised. If the minimum raise amount is
                      not reached you can reclaim your ETH.{' '}
                    </Td>
                  </Tr>
                </Table>
              </TableContainer>
            </Column3>
          </DashboardContainer>
          <GraphContainer></GraphContainer>
          <AboutSection>
            <AboutArea projectDescription={ICOs[0].projectDescription} />
          </AboutSection>
        </div>
      ) : (
        <h1>CONECT UR WALLET M9</h1>
      )}
    </>
  )
}

const ContributeContainer = ({ myWeb3, accounts, contractAddress, template }) => {
  const [inputBox, setInputBox] = useState('')

  async function contribute() {
    console.log('async accounts[0]:  ', accounts[0])
    console.log('async address:  ', template.options.address)
    await myWeb3.eth
      .sendTransaction({
        from: accounts[0],
        to: template.options.address,
        value: myWeb3.utils.toWei(inputBox, 'ether'),
      })
      .on('receipt', async () => {})
  }
  const handleInput = (e) => {
    setInputBox(e.target.value)
  }

  return (
    <>
      <form
        style={{ border: '2px solid #e6ddff', padding: '1rem' }}
        onSubmit={async (event) => {
          event.preventDefault()
          const result = await contribute()
        }}
      >
        <label
          for='contr-amount'
          style={{
            marginBottom: '0.8rem',
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 400,
            fontSize: '1rem',
          }}
        >
          Contribute ETH
        </label>
        <Input
          id='contr-amount'
          type='number'
          required={true}
          onChange={handleInput}
          value={inputBox}
          style={{
            width: '100%',
            marginTop: '0.5rem',
            marginBottom: '1rem',
            height: '2rem',
            fontFamily: "'Questrial', sans-serif",
          }}
        ></Input>
        <Button type='submit'>Contribute</Button>
      </form>
    </>
  )
}

const AboutArea = ({ projectDescription }) => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <AboutTitle>About the Project:</AboutTitle>
      </div>
      <AboutText>{projectDescription}</AboutText>
    </>
  )
}

export default IndividualListing
