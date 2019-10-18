import React from 'react'
import styled from 'styled-components'

import FolderContainer from '../components/FolderContainer'
import FileContainer from '../components/FileContainer'

const StyledCard = styled.div`
  box-shadow: 5px 5px 5px #ccc;
  border: 1px solid #ccc;
  height: 1000px;
  width: 750px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

export default StyledCard
