import { Link } from 'react-router-dom'
import icoImage from '../assets/ICO.jpg'
import styled from 'styled-components'
import SetUpIcoCard from './cards/SetUpIco'
import NavBar from '../NavBar'
import developersImage from '../assets/developersAndFounders.svg'

const H2 = styled.h2`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  text-align: left;
  font-size: 3rem;
  display: inline-block;
  margin: 2rem 0;
`

const LaunchButton = styled.button`
  font-family: 'Questrial', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  background: #ffffff;
  border: 2px solid #4e3fce;
  box-sizing: border-box;
  border-radius: 2rem;
  width: 25rem;
  height: 4rem;
  cursor: pointer;
`

const HeaderDiv = styled.div`
  border-bottom: 1px solid #4e3fce;
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
`

const DeveloperIndex = (props) => {
  return (
    <div>
      <NavBar
        imgSource={developersImage}
        titleText={'Developers - Create and Manage your project launches'}
      />
      <main style={{ padding: '0 10%' }}>
        <HeaderDiv>
          <H2>My Launches</H2>
          <Link
            to={'/setUpIco'}
            style={{
              textDecoration: 'none',
              height: '4rem',
              marginTop: '1.5rem',
            }}
          >
            <LaunchButton>Launch a New Project</LaunchButton>
          </Link>
        </HeaderDiv>
        <div style={{ padding: '2rem 2% 0 2%' }}>
          <SetUpIcoCard />
        </div>
      </main>
    </div>
  )
}

export default DeveloperIndex
