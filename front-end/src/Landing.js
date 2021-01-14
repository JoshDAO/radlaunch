import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import developersImage from './assets/developersAndFounders.svg'
import './landing.css'

const AnimatedDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 40rem;
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  text-align: justify;
  color: black;
`

const H2 = styled.h2`
  letter-spacing: 3px;
  font-weight: 500;
  text-align: center;
  margin-top: 10rem;
`

const Landing = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'space-evenly',
        height: '80%',
      }}
    >
      <Link to={'/developer'} style={{ textDecoration: 'none', width: '50%' }}>
        <AnimatedDiv className='developer-panel'>
          <img src={developersImage} />
          <H2>Developers</H2>
        </AnimatedDiv>
      </Link>
      <Link to={'/investor'} style={{ textDecoration: 'none', width: '50%' }}>
        <AnimatedDiv className='investor-panel'>
          <H2>Investors</H2>
          <div style={{ fontWeight: 300, padding: '3rem' }}>
            Be a pioneer, Invest in ICOs of projects listed on this site.
          </div>
        </AnimatedDiv>
      </Link>
    </div>
  )
}

export default Landing
