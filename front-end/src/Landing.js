import React, { Component } from 'react'
import styled from 'styled-components'
import './landing.css'

const AnimatedDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 7rem 3rem;
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  text-align: justify;
  color: black;
`

const H2 = styled.h2`
  letter-spacing: 3px;
  font-weight: 500;
  text-align: center;
`

const Landing = ({ setPage, navigate }) => {
  return (
    <div
      style={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'space-evenly',
        height: '80%',
      }}
    >
      <a style={{ textDecoration: 'none' }} href='/developer' onClick={navigate}>
        <AnimatedDiv className='developer-panel'>
          <H2>Developers</H2>
          <div style={{ fontWeight: 300 }}>
            Make your life easy, Set up a custom ICO from a variety of ICO styles and open your
            project up to investment
          </div>
        </AnimatedDiv>
      </a>
      <AnimatedDiv className='investor-panel'>
        <H2>Investors</H2>
        <div style={{ fontWeight: 300 }}>
          Be a pioneer, Invest in ICOs of projects listed on this site.
        </div>
      </AnimatedDiv>
    </div>
  )
}

export default Landing
