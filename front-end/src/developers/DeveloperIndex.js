import icoImage from '../assets/ICO.jpg'
import styled from 'styled-components'
import SetUpIcoCard from './cards/SetUpIco'

const H2 = styled.h2`
  letter-spacing: 3px;
  font-weight: 300;
  text-align: left;
  font-size: 3rem;
`

const DeveloperIndex = (props) => {
  return (
    <div>
      <H2>My ICOs:</H2>
      <SetUpIcoCard />
    </div>
  )
}

export default DeveloperIndex
