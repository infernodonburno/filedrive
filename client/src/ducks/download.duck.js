import { fetchDownloadFile, fetchDownloadFolder } from '../services/api'

import { fileDownload } from 'js-file-download'

export const DOWNLOAD_FILE_FAILURE = 'DOWNLOAD_FILE_FAILURE'
export const DOWNLOAD_FILE_DONE = 'DOWNLOAD_FILE_DONE'
export const DOWNLOAD_FOLDER_FAILURE = 'DOWNLOAD_FOLDER_FAILURE'
export const DOWNLOAD_FOLDER_DONE = 'DOWNLOAD_FOLDER_DONE'
export const DOWNLOAD_FILE_BEGIN = 'DOWNLOAD_FILE_BEGIN'
export const DOWNLOAD_FOLDER_BEGIN = 'DOWNLOAD_FOLDER_BEGIN'

const initialState = {
  file: {},
  folder: {},
  errorDownloadingFile: false,
  errorDownloadingFolder: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case DOWNLOAD_FILE_DONE:
      return {
        ...state,
        errorDownloadingFile: false,
        file: action.payload.file
      }
    case DOWNLOAD_FOLDER_DONE:
      return {
        ...state,
        errorDownloadingFolder: false,
        folder: action.payload.folder
      }
    case DOWNLOAD_FOLDER_FAILURE:
      return {
        ...state,
        folder: initialState.folder
      }
    case DOWNLOAD_FILE_FAILURE:
      return {
        ...state,
        file: initialState.file
      }
    default:
      return state
  }
}

export const downloadFileDone = file => ({
  type: DOWNLOAD_FILE_DONE,
  payload: {
    file
  }
})

export const downloadFolderDone = folder => ({
  type: DOWNLOAD_FOLDER_DONE,
  payload: {
    folder
  }
})

const downloadFileBegin = () => ({
  type: DOWNLOAD_FILE_BEGIN
})

const downloadFolderBegin = () => ({
  type: DOWNLOAD_FOLDER_BEGIN
})

const downloadFileFailure = () => ({
  type: DOWNLOAD_FILE_FAILURE
})

const downloadFolderFailure = () => ({
  type: DOWNLOAD_FOLDER_FAILURE
})

export const downloadFile = id => dispatch => {
  console.log('hey')
  dispatch(downloadFileBegin())
  fetchDownloadFile(id)
    .then(file => {
      console.log(file)
      return dispatch(downloadFileDone(file))
    })
    .catch(err => dispatch(downloadFileFailure(err)))
}

export const thunkDownloadFile = id => dispatch => {
  console.log('hey')
  dispatch(downloadFileBegin())
  console.log('you are here now')
  return fetchDownloadFile(id)
    .then(file => {
      console.log('This is the file: ', file)
      // console.log(file.data)
      var fileDownload = require('js-file-download')

      // convert file data back to real data
      var decodedData = window.atob(file.data) // decode the string

      fileDownload(decodedData, file.fileName)
      return dispatch(downloadFileDone(file))
    })
    .catch(err => dispatch(downloadFileFailure(err)))
}

export const downloadFolder = () => dispatch => {
  dispatch(downloadFolderBegin())
  fetchDownloadFolder()
    .then(({ folder }) => {
      return dispatch(downloadFolderDone(folder))
    })
    .catch(err => dispatch(downloadFolderFailure(err)))
}