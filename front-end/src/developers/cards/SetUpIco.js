import React from 'react'
import styled from 'styled-components'
import ICOimg from '../../assets/ICO.jpg'

const CardDiv = styled.div`
  box-shadow: 5px 10px 18px #888888;
  width: 17rem;
  height: 26rem;
  padding: 1rem;
`

const H3 = styled.h3`
  font-weight: 500;
  font-size: 1.3rem;
  color: #577083;
  letter-spacing: 0.08em;
  text-align: left;
`
const CardText = styled.div`
  text-align: left;
  font-weight: 300;
  color: #577083;
`
const SetUpButton = styled.button`
  background-color: hsl(343, 94%, 35%);
  color: white;
  padding: 1rem;
  border: none;
  margin: 4rem 0 0 9rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1rem;
`

const SetUpIcoCard = (props) => {
  return (
    <CardDiv>
      <img src={ICOimg} width='100%' />
      <H3>SET UP AN ICO</H3>
      <CardText>List a token for investment.</CardText>
      <SetUpButton>Set Up</SetUpButton>
    </CardDiv>
  )
}

export default SetUpIcoCard
