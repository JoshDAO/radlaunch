import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import IbcoImg from '../assets/ibcoImg.png'

const IcoTypeCard = styled.div`
  width: 17rem;
  height: 25rem;
  //border: 1px solid black;
  margin: 2rem;
`

const H2 = styled.h2`
  letter-spacing: 3px;
  font-weight: 300;
  text-align: left;
  font-size: 3rem;
`

const H3 = styled.h3`
  font-weight: 500;
  font-size: 1.5rem;
  color: #577083;
  letter-spacing: 0.08em;
  text-decoration: none;
`

const SelectICO = (props) => {
  return (
    <>
      <H2>Select your desired ICO style</H2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Link to={'/ibcoSetup'} style={{ textDecoration: 'none' }}>
          <IcoTypeCard>
            <div
              style={{ height: '60%', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
            >
              <img src={IbcoImg} width='110%' />
            </div>
            <H3>IBCO</H3>
          </IcoTypeCard>
        </Link>
        <IcoTypeCard />
        <IcoTypeCard />
      </div>
    </>
  )
}

export default SelectICO
