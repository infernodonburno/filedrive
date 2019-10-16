import React from 'react'
import styled from 'styled-components'

const UploadCenter = styled.div`
display: flex;
justify-content: center;
align-items: center;

`
const UploadButtonStyle = styled.button`
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
`

const UploadButton = props => {
  const onClick = event => {
    console.log('You clicked me')
  }

  return (
    <UploadCenter>
    <div className="upload-btn-wrapper">
      <UploadButtonStyle onClick={onClick}>Upload</UploadButtonStyle>
      <input type="file" name="myfile" />
    </div>
    </UploadCenter>
  )
}

export default UploadButton
