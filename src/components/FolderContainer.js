import React from 'react'
import styled from 'styled-components'

import DownloadButton from './DownloadButton'
import TrashButton from './TrashButton'
import ViewButton from './ViewButton'

const FolderContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 50vh;
`

const FolderContainer = props => {
  return (
    <FolderContainerStyle>
      <DownloadButton />
      <ViewButton />
      <TrashButton />{' '}
    </FolderContainerStyle>
  )
}

export default FolderContainer
