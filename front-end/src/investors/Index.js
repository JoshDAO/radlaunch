import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import investorsImage from '../assets/investorsImage.svg'
import IcoTable from './icoTable'
import Web3 from 'web3'

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
          conect ur wallet m8
        </div>
      )}
    </>
  )
}

export default InvestorIndex
