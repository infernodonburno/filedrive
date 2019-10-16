import React from 'react'
import styled from 'styled-components'

import FileContainer from '../components/FileContainer'
import FolderContainer from '../components/FolderContainer'
import UploadButton from '../components/UploadButton'

const Home = () => {
  return (
    <React.Fragment>
      <FolderContainer />
      <FileContainer />
      <UploadButton />
    </React.Fragment>
  )
}

export default Home
