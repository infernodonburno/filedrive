import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { uploadFile, uploadFolder } from '../ducks/upload.duck'

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
    const getFileRequest = file => {
      let reader = new FileReader()
      let fileByteArray = []
      reader.readAsArrayBuffer(file)
      reader.onloadend = event => {
        if (event.target.readyState == FileReader.DONE) {
          console.log('you are here')
          let array = new Uint8Array(event.target.result)
          for (let i = 0; i < array.length; i++) {
            fileByteArray.push(array[i])
          }
          console.log(fileByteArray)
        }
      }
      return { fileName: file.name, data: fileByteArray }
    }

    const getFileRequests = fileList => {
      let fileRequests = []
      for (let file of fileList) {
        fileRequests.push(getFileRequest(file))
      }
      return fileRequests
    }

    const getFolderName = folderPath => {
      let folderName = ''
      for (let char of folderPath) {
        if (char === '/') {
          break
        }
        folderName += char
      }
      return folderName
    }

    const onChangeFile = event => {
      let fileList = document.getElementById('uploadfile').files
      let file = fileList.item(0)
      let reader = new FileReader()
      let fileByteArray = []
      reader.readAsArrayBuffer(file)
      reader.onloadend = event => {
        if (event.target.readyState == FileReader.DONE) {
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
        let fileRequests = []
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
            fileRequests.push({ fileName: x.name, data: fileByteArray })
            console.log('REQUESTS INSIDE: ', fileRequests)
            fileByteArray = []
            if (fileRequests.length === fileList.length) {
              let folderReq = {
                folderName: folderName,
                folderID: 1,
                fileRequests
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
            Upload a file:
            <input type='file' id='uploadfile' onChange={onChangeFile} />
          </label>
          <label>
            Upload a folder:
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
