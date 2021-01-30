import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import investorsImage from '../assets/investorsImage.svg'
import IcoTable from './icoTable'
import Web3 from 'web3'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderDiv = styled.div`
  border-bottom: 1px solid #4e3fce;
  display: center;
  justify-content: space-between;
  padding: 0 2%;
`

const H2 = styled.h2`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  text-align: left;
  font-size: 2rem;
  display: inline-block;
  margin: 1rem 0;
`
const InvestorIndex = ({
  myWeb3,
  setMyWeb3,
  accounts,
  setAccounts,
  chainId,
  setChainId,
  launchedICOs,
  setLaunchedICOs,
}) => {
  useEffect(() => {
    console.log('ICOs    ', launchedICOs)
  })
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
      <HeaderDiv>
        <H2>All Launches</H2>
      </HeaderDiv>
      {myWeb3 ? (
        <IcoTable
          myWeb3={myWeb3}
          setMyWeb3={setMyWeb3}
          accounts={accounts}
          setAccounts={setAccounts}
        />
      ) : (
        <div
          style={{
            fontSize: '4rem',
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 400,
            paddingTop: '3rem',
          }}
        >
          Connect ur wallet m8
        </div>
      )}
    </>
  )
}

export default InvestorIndex
