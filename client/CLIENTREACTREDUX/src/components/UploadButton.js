import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { uploadFile, uploadFolder } from '../ducks/upload.duck'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonToolBar from 'react-bootstrap/ButtonToolbar'

const UploadCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

class UploadButton extends React.Component {
  render () {
    const onChangeFile = event => {
      let fileList = document.getElementById('uploadfile').files
      let file = fileList.item(0)
      let reader = new FileReader()
      let fileByteArray = []
      reader.readAsArrayBuffer(file)
      reader.onloadend = event => {
        if (event.target.readyState === FileReader.DONE) {
          console.log('you are here')
          let array = new Uint8Array(event.target.result)
          for (let i = 0; i < array.length; i++) {
            fileByteArray.push(array[i])
          }
          let fileRequest = { fileName: file.name, data: fileByteArray }
          let folderID = this.props.folderID
          console.log(folderID)
          this.props.uploadFile(fileRequest, folderID)
        }
      }
    }

    // const onChangeFolder = event => {
    // let fileList = document.getElementById('uploadfolder').files
    // console.log(fileList.item(0).webkitRelativePath)
    // let folderName = getFolderName(fileList.item(0).webkitRelativePath)
    // console.log(folderName)

    // let fileRequests = getFileRequests(fileList)
    // let folderReq = { folderName: folderName, folderID: 1, fileRequests }
    // this.props.uploadFolder(folderReq)
    // thunkedUploadFolder(folderReq)
    // }

    const onChangeFolder = event => {
      const { uploadFolder } = this.props
      console.log(`before upload`)
      let upload = document.getElementById('uploadfolder')
      console.log('test')
      console.log(upload.files)
      console.log(upload.value)

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

      var fileReader = new FileReader()
      event.persist()
      fileReader.readAsArrayBuffer(myFile)
      fileReader.onloadend = function (evt) {
        let files = []
        let fileByteArray = []
        for (let x of fileList) {
          console.log('LENGTH: ', fileList.length)
          // x.arrayBuffer().then(buffer => {})
          var bufferPromise = x.arrayBuffer()

          bufferPromise.then(buffer => {
            let array = new Uint8Array(buffer)
            console.log('ARRAY: ', array)
            for (let g of array) {
              fileByteArray.push(g)
            }
            // console.log('FILEBYTEARRAY: ', fileByteArray)
            // console.log('YESSSS', array)
            files.push({ fileName: x.name, data: fileByteArray })
            console.log('REQUESTS INSIDE: ', files)
            fileByteArray = []
            if (files.length === fileList.length) {
              let folderReq = {
                folderName: folderName,
                files,
                folders: []
              }
              uploadFolder(folderReq)
            }
          })

          // var array = new Uint8Array(bufferPromise)
          // console.log('ARRAY', array)
          // for (var i = 0; i < array.length; i++) {
          //   fileByteArray.push(array[i])
          // }
          // console.log(fileByteArray)
          // fileRequests.push({ fileName: x.name, data: fileByteArray })
        }
      }
    }

    // const onClick = event => {
    //   this.props.uploadFile(this.props.file)
    //   console.log('it worked')
    // }

    return (
      <UploadCenter>
        <div className='upload-btn-wrapper'>
          {/* <UploadButtonStyle onClick={onClick}>Upload</UploadButtonStyle> */}
          <label>
          <h4> Upload a file:</h4>
            <input type='file' id='uploadfile' onChange={onChangeFile} />
          </label>
          <label>
            <h4>Upload a folder:</h4>
            <input
              directory=''
              webkitdirectory=''
              type='file'
              id='uploadfolder'
              onChange={onChangeFolder}
            />
          </label>
        </div>
      </UploadCenter>
    )
  }
}

UploadButton.propTypes = {
  folderID: PropTypes.string.isRequired,
  uploadFile: PropTypes.func.isRequired,
  uploadFolder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  file: state.upload.file,
  folder: state.upload.folder
})

const mapDispatchToProps = dispatch => ({
  uploadFile: (file, folderID) => dispatch(uploadFile(file, folderID)),
  uploadFolder: folder => dispatch(uploadFolder(folder))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadButton)
