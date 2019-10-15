import React from 'react'
import styled from 'styled-components'

const UploadButtonStyle = styled.button``

const UploadButton = props => {
  const onClick = event => {
    console.log('You clicked me')
  }

  return (
    <div>
      <UploadButtonStyle onClick={onClick}>Upload</UploadButtonStyle>
    </div>
  )
}

export default UploadButton
