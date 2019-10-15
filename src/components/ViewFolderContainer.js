import React from 'react'
import styled from 'styled-components'

import DownloadButton from './DownloadButton'
import TrashButton from './TrashButton'

const FolderContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 50vh;
`

const ViewFolderContainer = props => {
  return (
    <FolderContainerStyle>
      <DownloadButton />
      <TrashButton />{' '}
    </FolderContainerStyle>
  )
}

export default ViewFolderContainer
