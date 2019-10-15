import React from 'react'
import styled from 'styled-components'

const DownloadButtonStyle = styled.button`
  background: gray;
  font-size: 20px;
  padding: 15px 15px;
  border-radius: 50%;
`

const DownloadButton = props => {
  const onClick = event => {
    console.log('You clicked me')
  }

  return (
    <div>
      <DownloadButtonStyle onClick={onClick}>Download</DownloadButtonStyle>
    </div>
  )
}

export default DownloadButton
