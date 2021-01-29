import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import developersImage from './assets/developersAndFounders.svg'
import investorsImage from './assets/investorsImage.svg'
import DeveloperIndex from './developers/DeveloperIndex'
import './landing.css'
import NavBar from './NavBar'

const AnimatedDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: black;
`

const H2 = styled.h2`
  font-family: 'Questrial', sans-serif;
  font-size: 3rem;
  font-weight: 400;
  text-align: center;
  margin-top: 5rem;
`

const Img = styled.img`
  width: 13rem;
  height: 13rem;
  margin: 0 auto;
`

const Landing = ({
  imgSource,
  titleText,
  myWeb3,
  setMyWeb3,
  accounts,
  setAccounts,
  chainId,
  setChainId,
}) => {
  const [investorHover, setInvestorHover] = useState(false)
  const [developerHover, setDeveloperHover] = useState(false)
  return (
    <>
      <NavBar
        titleText={'Reliable, Secure and Permissionless launches for pioneering projects'}
        myWeb3={myWeb3}
        setMyWeb3={setMyWeb3}
        accounts={accounts}
        setAccounts={setAccounts}
        chainId={chainId}
        setChainId={setChainId}
      />
      <div
        style={{
          display: 'flex',
          margin: 'auto',
          justifyContent: 'space-evenly',
          height: '100%',
          flex: '0 1 auto',
          width: '100%',
        }}
      >
        <Link
          to={'/developer'}
          style={{ textDecoration: 'none', width: '50%' }}
          onMouseEnter={() => setDeveloperHover(true)}
          onMouseLeave={() => setDeveloperHover(false)}
        >
          <AnimatedDiv className='developer-panel'>
            <Img src={developersImage} />
            {developerHover ? (
              <DeveloperHoverText show={true} />
            ) : (
              <DeveloperHoverText show={false} />
            )}
            <H2>Developers and Founders</H2>
          </AnimatedDiv>
        </Link>
        <Link
          to={'/investor'}
          style={{ textDecoration: 'none', width: '50%' }}
          onMouseEnter={() => setInvestorHover(true)}
          onMouseLeave={() => setInvestorHover(false)}
        >
          <AnimatedDiv className='investor-panel'>
            <Img src={investorsImage} />
            {investorHover ? <InvestorHoverText show={true} /> : <InvestorHoverText show={false} />}
            <H2>Investors</H2>
          </AnimatedDiv>
        </Link>
      </div>
    </>
  )
}

const InvestorHoverText = ({ show }) => {
  const componentClasses = ['hover-text']

  if (show) {
    componentClasses.push('show')
  }

  return (
    <div className={componentClasses.join(' ')}>
      Be early investors in projects launched through RADLAUNCH.
    </div>
  )
}
const DeveloperHoverText = ({ show }) => {
  const componentClasses = ['hover-text', 'dev-text']

  if (show) {
    componentClasses.push('show')
  }

  return (
    <div className={componentClasses.join(' ')}>
      Choose from our secure fundraising contracts to launch your tokens, all you need is an ERC20
      Token and Ether.{' '}
    </div>
  )
}

export default Landing
