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
  background-color: lightgray;
`

const FolderContainer = props => {
  return (
    <FolderContainerStyle>
      List Folders
      <DownloadButton />
      <ViewButton />
      <TrashButton />{' '}
    </FolderContainerStyle>
  )
}

export default FolderContainer
