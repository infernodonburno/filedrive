import React from 'react'
import styled from 'styled-components'
import DownloadButton from '../components/DownloadButton'
import UploadButton from '../components/UploadButton'
import TrashButton from '../components/TrashButton'

const Home = () => {
  return (
    <React.Fragment>
      <DownloadButton />
      <TrashButton />
      <UploadButton />
    </React.Fragment>
  )
}

export default Home
