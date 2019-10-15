import React from 'react'
import styled from 'styled-components'

import RestoreButton from './RestoreButton'
import DeleteButton from './DeleteButton'
import ViewButton from './ViewButton'

const TrashContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 50vh;
`

const TrashContainer = props => {
  return (
    <TrashContainerStyle>
      List Files/Folders
      <RestoreButton />
      <ViewButton />
      <DeleteButton />{' '}
    </TrashContainerStyle>
  )
}

export default TrashContainer
