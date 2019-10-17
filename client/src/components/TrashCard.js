import React from 'react'
import styled from 'styled-components'

import TrashContainer from '../components/TrashContainer'

const StyledCard = styled.div`
  box-shadow: 5px 5px 5px #ccc;
  border: 1px solid #ccc;
  height: 500px;
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const TrashCard = props => {
  return (
    <StyledCard>
      <TrashContainer />
      <TrashContainer />
    </StyledCard>
  )
}

export default TrashCard
