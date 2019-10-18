import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { uploadFile, uploadFolder } from '../ducks/upload.duck'
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
    //     const onChange = event => {
    //       // For single file
    //             let upload = document.getElementById('uploadfile')
    //       console.log(upload.value)
    //       let fileList = upload.files
    //       let myFile = fileList.item(0)
    //       var reader = new FileReader()
    //       let fileByteArray = [];
    // reader.readAsArrayBuffer(myFile);
    // reader.onloadend = function (evt) {
    //     if (evt.target.readyState == FileReader.DONE) {
    //        var arrayBuffer = evt.target.result,
    //            array = new Uint8Array(arrayBuffer);
    //        for (var i = 0; i < array.length; i++) {
    //            fileByteArray.push(array[i]);
    //         }
    //     }
    // }
    // let file = {fileName: myFile.name, data: fileByteArray}
    // this.props.uploadFile(file)
    //       }

    // const thunkedUploadFolder = getFileRequests() => uploadFolder(folder)
    // const getFileRequests = fileList => {

    // }

    const onChange = event => {
      // For single file
      console.log(`before upload`)
      let upload = document.getElementById('uploadfolder')
      console.log('test')
      console.log(upload.files)
      console.log(upload.name)

      let fileList = upload.files
      let myFile = fileList.item(0)
      let folderPath = myFile.webkitRelativePath
      console.log(myFile.webkitRelativePath)
      let folderName = ''
      for (let char of folderPath) {
        if (char === '/') {
          break
        }
        folderName += char
      }

      console.log(folderName)
      let fileRequests = []
      for (let x of fileList)
      {
        var reader = new FileReader()
        // let file = {}
      let fileByteArray = [];
    reader.readAsArrayBuffer(x);
    reader.onprogress = function (evt) {
        var arrayBuffer = evt.target.result,
            array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < array.length; i++) {
            fileByteArray.push(array[i]);
            
        }
        
    
    console.log(fileByteArray)
  // file= {fileName: x.name, data: fileByteArray}
    }
    fileRequests.push({fileName: x.name, data: fileByteArray})
    // console.log(fileByteArray)
  }
      let folderReq = {folderName: folderName, folderID: 1, fileRequests}
      this.props.uploadFolder(folderReq)
    }

    const onClick = event => {
      console.log('it worked')
    }

    return (
      <UploadCenter>
        <div className='upload-btn-wrapper'>
          <UploadButtonStyle onClick={onClick}>Upload</UploadButtonStyle>
          <input type='file' id='uploadfile' onChange={onChange} />
          <input
            directory=''
            webkitdirectory=''
            type='file'
            id='uploadfolder'
            onChange={onChange}
          />
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
  uploadFolder: folder  => dispatch(uploadFolder(folder))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadButton)
