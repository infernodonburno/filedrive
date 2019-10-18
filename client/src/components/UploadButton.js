import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { uploadFile } from '../ducks/upload.duck'

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

  .upload-btn-wrapper input[type='file'] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`

class UploadButton extends React.Component {
  render () {
    const onChange = event => {
      // let file = inputElement.file
      let file = {
        fileName: 'red.txt',
        data: [12, 56, 32, 64]
      }
      uploadFile(file)
    }
    const onClick = event => {
      console.log('it worked')
    }

    return (
      <UploadCenter>
        <div className='upload-btn-wrapper'>
          <UploadButtonStyle onClick={onClick}>Upload</UploadButtonStyle>
          <input type='file' name='myfile' onChange={onChange} />
          {/* <input type='folder' name='myfolder' /> */}
        </div>
      </UploadCenter>
    )
  }
}

UploadButton.propTypes = {
  uploadFile: PropTypes.func.isRequired,
  uploadFolder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  file: state.upload.file,
  folder: state.upload.folder
})

const mapDispatchToProps = dispatch => ({
  uploadFile: file => dispatch(uploadFile()),
  uploadFolder: folder => dispatch(uploadFolder())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadButton)
