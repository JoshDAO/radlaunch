import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import investorsImage from '../assets/investorsImage.svg'
import IcoTable from './icoTable'

const InvestorIndex = ({ myWeb3, setMyWeb3, accounts, setAccounts, chainId, setChainId }) => {
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
      <IcoTable />
    </>
  )
}

export default InvestorIndex
