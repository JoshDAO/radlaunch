import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import 'react-tabulator/lib/styles.css' // required styles
import 'react-tabulator/lib/css/tabulator.min.css' // theme
import map from '../artifacts/deployments/map'
import { fetchDatabaseIcoData } from '../utils/apiCalls'

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
  border-right: 1px solid #e6ddff;
  text-align: center;
`
const Tr = styled.tr`
  height: 3rem;
  border-top: 1px solid #e6ddff;
  &:first-of-type {
    border: none;
  }
`

const Thead = styled.thead`
  border-bottom: 1px solid #e6ddff;
  font-size: 1.5rem;
`

const TableContainer = styled.div`
  border: 1px solid #e6ddff;
  border-radius: 10px;
  width: 80%;
  margin: 2rem auto 0 auto;
`

const IcoTable = ({ myWeb3, accounts }) => {
  const [factory, setFactory] = useState()
  const [tokenContract, setTokenContract] = useState()
  const [launchedICOs, setLaunchedICOs] = useState([])
  const [loaded, setLoaded] = useState(false)

  async function loadInitialFactory() {
    // if (chainId <= 42){
    //     return
    // }
    const dyn = await loadContract('42', 'DynPoolFactory')
    setFactory(dyn)
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
    const amountRaised = await template.methods
      .totalProvided()
      .call()
      .then((result) => result)

    return amountRaised
  }

  async function getExtraTokendata(template) {
    const name = await template.methods
      .name()
      .call()
      .then((result) => result)

    return {
      name,
    }
  }

  function statusChecker(startDate, endDate, amountRaised, minProvide) {
    if (Date.now() < startDate) {
      return 'Upcoming'
    } else if (startDate <= Date.now() && Date.now() <= endDate) {
      return 'Ongoing'
    } else if (Date.now() >= endDate && amountRaised >= minProvide) {
      return 'Successful'
    } else if (Date.now() >= endDate && amountRaised < minProvide) {
      return 'Unsuccessful'
    }
  }

  useEffect(async () => {
    if (myWeb3 === undefined || accounts === undefined) {
      return
    } else {
      setTimeout(() => setLoaded(true), 5000)
      const factory = await loadInitialFactory()
      const eventsArray = await events(factory)
      const databaseData = await fetchDatabaseIcoData(accounts[0])
      eventsArray.forEach(async (event) => {
        const tokenContract = await loadInitialTemplate(event.returnValues['2'], 'ERCToken')
        const ICOContract = await loadInitialTemplate(event.returnValues['1'], 'IBCOTemplate')
        const amountRaised = await getExtraICOdata(ICOContract)
        const name = await getExtraTokendata(tokenContract)
        const projectData = [
          {
            ...name,
            amountRaised: amountRaised / 1e18,
            startDate: new Date(event.returnValues.startDate * 1000).toString().substr(4, 20),
            endDate: new Date(event.returnValues.endDate * 1000).toString().substr(4, 20),
            type: 'Dynamic Swap Pool',
            status: statusChecker(
              event.returnValues.startDate * 1000,
              event.returnValues.endDate * 1000,
              parseInt(amountRaised),
              parseInt(event.returnValues.minimalProvide),
            ),
            contractAddress: event.returnValues['1'],
          },
        ]
        console.log('projectData:  ', projectData)

        setLaunchedICOs((launchedICOs) => launchedICOs.concat(projectData))
      })
    }
  }, [myWeb3, accounts])

  return (
    <>
      {launchedICOs.length ? (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Td style={{ fontSize: '1.3rem', textAlign: 'center' }}>Name</Td>
                <Td style={{ fontSize: '1.3rem', textAlign: 'center' }}>Status</Td>
                <Td style={{ fontSize: '1.3rem', textAlign: 'center' }}>Launch Type</Td>
                <Td style={{ fontSize: '1.3rem', textAlign: 'center' }}>Amount Raised (ETH)</Td>
                <Td style={{ fontSize: '1.3rem', textAlign: 'center' }}>Start Date GMT</Td>
                <Td style={{ fontSize: '1.3rem', textAlign: 'center' }}>End Date GMT</Td>
                <Td style={{ width: '10rem', borderRight: 'none' }}></Td>
              </Tr>
            </Thead>
            <tbody>
              {launchedICOs.map((ico) => {
                return (
                  <Tr>
                    <Td>{ico.name}</Td>
                    <Td>{ico.status}</Td>
                    <Td>{ico.type}</Td>
                    <Td>{ico.amountRaised}</Td>
                    <Td>{ico.startDate}</Td>
                    <Td>{ico.endDate}</Td>
                    <Td>
                      <IcoLink url={ico.contractAddress} />
                    </Td>
                  </Tr>
                )
              })}
            </tbody>
          </Table>
        </TableContainer>
      ) : loaded ? (
        <h1>Nothing to display. Ensure you are on the correct Ethereum network.</h1>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  )
}

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

const IcoLink = (props) => {
  return (
    <Link to={`/investor/${props.url}`}>
      <Button>View Launch</Button>
    </Link>
  )
}

export default IcoTable
