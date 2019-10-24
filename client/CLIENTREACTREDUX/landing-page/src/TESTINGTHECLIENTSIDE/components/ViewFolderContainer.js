import React from 'react'
import styled from 'styled-components'

import DownloadButton from './DownloadButton'
import TrashButton from './TrashButton'

import { folders } from '../data'

const FolderContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 50vh;
`

const ViewFolderContainer = props => {
  const folderNames = folders.map(folder => (
    <h key={folder.id}>
      <p className='a'>{folder.folderName}</p>
    </h>
  ))
  return (
    <FolderContainerStyle>
      <span>{folderNames}</span>
      <DownloadButton />
      <TrashButton src='https://vignette.wikia.nocookie.net/tana-mongeau4885/images/3/36/Photo.jpg/revision/latest?cb=20170412031044' />{' '}
    </FolderContainerStyle>
  )
}

export default ViewFolderContainer
