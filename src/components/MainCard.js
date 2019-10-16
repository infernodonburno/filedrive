import React from 'react'
import styled from 'styled-components'

import FolderContainer from '../components/FolderContainer'

const StyledCard = styled.div`
  box-shadow: 5px 5px 5px #ccc;
  border: 1px solid #ccc;
  height: 700px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

const MainCard = props => {
  return (
    <StyledCard>
      <FolderContainer />
      <FolderContainer />
    </StyledCard>
  )
}

export default MainCard
