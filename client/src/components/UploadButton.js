import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { uploadFile } from '../ducks/upload.duck'
import { rootFile2Req } from '../data'

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
            let upload = document.getElementById('upload')
      console.log(upload.value)
      let fileList = upload.files
      let myFile = fileList.item(0)
      var reader = new FileReader()
      let fileByteArray = [];
reader.readAsArrayBuffer(myFile);
reader.onloadend = function (evt) {
    if (evt.target.readyState == FileReader.DONE) {
       var arrayBuffer = evt.target.result,
           array = new Uint8Array(arrayBuffer);
       for (var i = 0; i < array.length; i++) {
           fileByteArray.push(array[i]);
        }
    }
}
let file = {fileName: myFile.name, data: fileByteArray}
this.props.uploadFile(file)
// var file = event.target.files[0]
// reader.onload = function (e) {
        
      //   e.target.result)
      }
      // let upload = document.getElementById('upload')
      // console.log(upload.value)
      // let fileList = upload.files
      // let file = fileList.item(0)
      // console.log(fileList[0].name)
      // console.log(file)
      // this.props.uploadFile(file)
    
    const onClick = event => {
      console.log('it worked')
    }

    return (
      <UploadCenter>
        <div className='upload-btn-wrapper'>
          <UploadButtonStyle onClick={onClick}>Upload</UploadButtonStyle>
          <input
            type='file'
            name='uploadfile'
            id='upload'
            onChange={onChange}
          />
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
  uploadFile: file => dispatch(uploadFile(file)),
  uploadFolder: folder => dispatch(uploadFolder(folder))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadButton)
