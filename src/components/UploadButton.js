import React from 'react'
import styled from 'styled-components'

const UploadButtonStyle = styled.button`
background: gray;
font-size: 20px;
padding: 15px 15px;
border-radius: 50%;`

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
