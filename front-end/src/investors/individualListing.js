import React from 'react'
import NavBar from '../NavBar'
import investorsImage from '../assets/investorsImage.svg'

const IndividualListing = ({ myWeb3, setMyWeb3, accounts, setAccounts, chainId, setChainId }) => {
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
    </>
  )
}

export default IndividualListing
