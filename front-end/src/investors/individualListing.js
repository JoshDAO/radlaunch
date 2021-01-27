import React from 'react'
import NavBar from '../NavBar'
import investorsImage from '../assets/investorsImage.svg'
import styled from 'styled-components'

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

const IndividualListing = ({
  myWeb3,
  setMyWeb3,
  accounts,
  setAccounts,
  chainId,
  setChainId,
  launchedICOs,
}) => {
  const ico = launchedICOs[0]
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
      <DashboardContainer>
        <Column1>
          <ProjectTitle>{ico.name}</ProjectTitle>
          <ProjectImage src={ico.imageUrl} />
        </Column1>
        <Column2>
          <Button>
            <a href={ico.etherscanLink} target='_blank'>
              View on Etherscan
            </a>
          </Button>
          <Span>Verified status: Verified</Span>
          <Span>Access: Public</Span>
          <Button>
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
                  In this type of launch if the amount raised is above the minimum raise amount. You
                  will be allocated a percentage of the tokens for sale equivalent to your
                  percentage contribution of the Amount raised. If the minimum raise amount is not
                  reached you can reclaim your ETH.{' '}
                </Td>
              </Tr>
            </Table>
          </TableContainer>
        </Column3>
      </DashboardContainer>
      <GraphContainer></GraphContainer>
      <AboutSection>
        <div>{ico.projectDescription}</div>
      </AboutSection>
    </>
  )
}

export default IndividualListing
