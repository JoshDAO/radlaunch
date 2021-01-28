import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Input } from 'rimble-ui'

import map from '../artifacts/deployments/map.json'
import NavBar from '../NavBar'
import developersImage from '../assets/developersAndFounders.svg'
import { fetchDatabaseIcoData, updateIcoImage, updateProjectDescription } from '../utils/apiCalls'

const H2 = styled.h2`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  text-align: left;
  font-size: 3rem;
  display: inline-block;
  margin: 2rem 0;
`

const LaunchButton = styled.button`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  background: #ffffff;
  border: 2px solid #4e3fce;
  box-sizing: border-box;
  border-radius: 2rem;
  width: 25rem;
  height: 4rem;
  cursor: pointer;
`

const HeaderDiv = styled.div`
  border-bottom: 1px solid #4e3fce;
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
`

const DeveloperIndex = ({
  imgSource,
  titleText,
  myWeb3,
  setMyWeb3,
  accounts,
  setAccounts,
  chainId,
  setChainId,
}) => {
  return (
    <div>
      <NavBar
        imgSource={developersImage}
        titleText={'Developers - Create and Manage your project launches'}
        myWeb3={myWeb3}
        setMyWeb3={setMyWeb3}
        accounts={accounts}
        setAccounts={setAccounts}
        chainId={chainId}
        setChainId={setChainId}
      />
      <main style={{ padding: '0 10%' }}>
        <HeaderDiv>
          <H2>My Launches</H2>
          <Link
            to={'/IbcoSetup'}
            style={{
              textDecoration: 'none',
              height: '4rem',
              marginTop: '1.5rem',
            }}
          >
            <LaunchButton>Launch a New Project</LaunchButton>
          </Link>
        </HeaderDiv>
        <div style={{ padding: '2rem 2% 0 2%' }}>
          <IcoDashboard
            myWeb3={myWeb3}
            setMyWeb3={setMyWeb3}
            accounts={accounts}
            setAccounts={setAccounts}
          />
        </div>
      </main>
    </div>
  )
}

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

const IcoDashboard = ({ myWeb3, setMyWeb3, accounts, setAccounts }) => {
  const [factory, setFactory] = useState()
  const [tokenContract, setTokenContract] = useState()
  const [launchedICOs, setLaunchedICOs] = useState([])

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

  async function withdrawToken(template) {
    await template.methods
      .withdrawToken()
      .send({ from: accounts[0] })
      .on('receipt', async () => {})
  }

  async function withdrawProvidedETH(template) {
    await template.methods
      .withdrawProvidedETH()
      .send({ from: accounts[0] })
      .on('receipt', async () => {})
  }
  async function withdrawUnclaimedToken(template) {
    await template.methods
      .withdrawUnclaimedToken()
      .send({ from: accounts[0] })
      .on('receipt', async () => {})
  }

  useEffect(async () => {
    if (myWeb3 === undefined || accounts === undefined) {
      return
    } else {
      const factory = await loadInitialFactory()
      const eventsArray = await events(factory)
      const databaseData = await fetchDatabaseIcoData(accounts[0])
      console.log('database Data:  ', databaseData)
      eventsArray
        .filter((event) => event['returnValues']['0'] === accounts[0])
        .forEach(async (event) => {
          const dbData = databaseData.data.filter(
            (ico) => ico.tokenAddress === event.returnValues['2'],
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
              imageUrl: dbData[0].imageUrl,
              projectDescription: dbData[0].projectDescription,
              etherscanLink: 'https://kovan.etherscan.io/address/' + event.returnValues['1'],
            },
          ]
          console.log(projectData)
          setLaunchedICOs((launchedICOs) => launchedICOs.concat(projectData))
        })
    }
  }, [myWeb3, accounts])

  // ---------- form handling -------------
  const [imageUrl, setImageUrl] = useState('')

  const handleImageUrlInput = (e) => {
    setImageUrl(e.target.value)
    validateInput(e)
  }
  const validateInput = (e) => {
    e.target.parentNode.classList.add('was-validated')
  }

  return (
    <>
      {launchedICOs.length ? (
        launchedICOs.map((ico) => (
          <>
            <DashboardContainer>
              <Column1>
                <ProjectTitle>{ico.name}</ProjectTitle>
                <ImageContainer
                  imageUrl={ico.imageUrl}
                  accounts={accounts[0]}
                  tokenAddress={ico.tokenAddress}
                />
              </Column1>
              <Column2>
                <Button>
                  <a href={ico.etherscanLink} target='_blank'>
                    View on Etherscan
                  </a>
                </Button>
                <Span>Verified status: Verified</Span>
                <Span>Access: Public</Span>
                <Button
                  style={{ marginTop: '2rem' }}
                  disabled={Date.now() < ico.endDate}
                  onClick={async () => {
                    const ICOContract = await loadInitialTemplate(
                      ico.contractAddress,
                      'IBCOTemplate',
                    )
                    ico.amountRaised < ico.minimumRaiseAmount
                      ? withdrawToken(ICOContract)
                      : withdrawProvidedETH(ICOContract)
                  }}
                >
                  {ico.amountRaised < ico.minimumRaiseAmount ? 'Withdraw Tokens' : 'Withdraw ETH'}
                </Button>
                <Span>Please note: Withdrawals can only be made once the ICO has ended.</Span>
              </Column2>
              <Column3>
                <TableContainer>
                  <Table>
                    <Tr>
                      <Td>
                        Contract address: <br /> <b>{ico.contractAddress}</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Start/end date:
                        <br />{' '}
                        <b>
                          {new Date(ico.startDate).toString().substr(4, 20)} to{' '}
                          {new Date(ico.endDate).toString().substr(4, 24)}
                        </b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Tokens for sale: <b>{ico.tokenSupply / 1e18}</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Amount raised: <b>{ico.amountRaised / 1e18}</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Number of investors: <b>{ico.numberOfProviders}</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Minimum raise amount: <b>{ico.minimumRaiseAmount / 1e18}</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Your contribution: <b>{ico.yourContribution / 1e18}</b>
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
                        <b>{ico.tokenAddress}</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Token name: <b>{ico.name}</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Token Symbol: <b>{ico.symbol}</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Total token supply: <b>{ico.totalSupply / 1e18}</b>
                      </Td>
                    </Tr>
                    <Tr style={{ height: '9rem' }}>
                      <Td>
                        Launch type: Dynamic swap pool
                        <br />
                        <br />
                        In this type of launch if the amount raised is above the minimum raise
                        amount. You will be allocated a percentage of the tokens for sale equivalent
                        to your percentage contribution of the Amount raised. If the minimum raise
                        amount is not reached you can reclaim your ETH.{' '}
                      </Td>
                    </Tr>
                  </Table>
                </TableContainer>
              </Column3>
            </DashboardContainer>
            <GraphContainer></GraphContainer>
            <AboutSection>
              <AboutArea
                projectDescription={ico.projectDescription}
                tokenAddress={ico.tokenAddress}
                accounts={accounts[0]}
              />
            </AboutSection>
          </>
        ))
      ) : (
        <div
          style={{
            fontSize: '4rem',
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 400,
            paddingTop: '3rem',
          }}
        >
          {accounts ? 'You have no ICOs launched' : 'conect ur wallet m8'}
        </div>
      )}
    </>
  )
}

const ImageContainer = ({ imageUrl, accounts, tokenAddress }) => {
  const [imgUrl, setImgUrl] = useState(imageUrl)
  const [inputBox, setInputBox] = useState('')
  const handleImageUrlInput = (e) => {
    setInputBox(e.target.value)
    validateInput(e)
  }
  const validateInput = (e) => {
    e.target.parentNode.classList.add('was-validated')
  }

  return (
    <>
      {imgUrl ? (
        <ProjectImage src={imgUrl} />
      ) : (
        <form
          style={{ border: '2px solid #e6ddff', padding: '1rem' }}
          onSubmit={async (event) => {
            event.preventDefault()
            const result = await updateIcoImage(accounts, tokenAddress, inputBox)
            setImgUrl(result.listing.imageUrl)
          }}
        >
          <label
            for='address-input'
            style={{
              marginBottom: '0.8rem',
              fontFamily: "'Questrial', sans-serif",
              fontWeight: 400,
              fontSize: '1rem',
            }}
          >
            Enter hosted image url:
          </label>
          <Input
            id='image-url'
            type='text'
            required={true}
            onChange={handleImageUrlInput}
            value={inputBox}
            style={{
              width: '100%',
              marginTop: '0.5rem',
              marginBottom: '1rem',
              height: '2rem',
            }}
          ></Input>
          <Button type='submit'>Upload your logo</Button>
        </form>
      )}
    </>
  )
}

const AboutArea = ({ projectDescription, accounts, tokenAddress }) => {
  const [projDescription, setProjDescription] = useState(projectDescription)
  const [inputBox, setInputBox] = useState(projectDescription)
  const [editOpen, setEditOpen] = useState(false)

  const handleProjectDescriptionInput = (e) => {
    setInputBox(e.target.value)
    validateInput(e)
  }
  const validateInput = (e) => {
    e.target.parentNode.classList.add('was-validated')
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <AboutTitle>About the Project:</AboutTitle>
        <EditButton
          onClick={async () => {
            if (editOpen) {
              console.log('sent  ', accounts, tokenAddress, inputBox)
              const result = await updateProjectDescription(accounts, tokenAddress, inputBox)
              console.log('result:   ', result)
              setProjDescription(result.listing.projectDescription)
            }
            setEditOpen(!editOpen)
          }}
        >
          {editOpen ? 'Submit' : 'Edit'}
        </EditButton>
      </div>
      {editOpen ? (
        <form>
          <Input
            id='image-url'
            type='text'
            required={true}
            onChange={handleProjectDescriptionInput}
            value={inputBox}
            style={{
              width: '100%',
              marginTop: '0.5rem',
              marginBottom: '1rem',
              height: '2rem',
            }}
          ></Input>
        </form>
      ) : (
        <AboutText>{projDescription}</AboutText>
      )}
    </>
  )
}
export default DeveloperIndex
