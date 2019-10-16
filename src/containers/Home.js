import React from 'react'
import styled from 'styled-components'

import FileContainer from '../components/FileContainer'
import EnhancedTable from '../components/FolderContainer'
import UploadButton from '../components/UploadButton'
import MainCard from '../components/MainCard'

const Home = () => {
  return (
    <React.Fragment>
      <MainCard>
        <EnhancedTable />
        <FileContainer />
      </MainCard>
      <UploadButton />
    </React.Fragment>
  )
}

export default Home
