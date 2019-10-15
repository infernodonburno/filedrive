import { fetchDownloadFile, fetchDownloadFolder } from '../services/api'

export const DOWNLOAD_FILE_FAILURE = 'DOWNLOAD_FILE_FAILURE'
export const DOWNLOAD_FILE_DONE = 'DOWNLOAD_FILE_DONE'
export const DOWNLOAD_FOLDER_FAILURE = 'DOWNLOAD_FOLDER_FAILURE'
export const DOWNLOAD_FOLDER_DONE = 'DOWNLOAD_FOLDER_DONE'
export const DOWNLOAD_FILE_BEGIN = 'DOWNLOAD_FILE_BEGIN'
export const DOWNLOAD_FOLDER_BEGIN = 'DOWNLOAD_FOLDER_BEGIN'

const initialState = {
  files: [],
  folders: [],
  errorDownloadingFile: false,
  errorDownloadingFolder: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case DOWNLOAD_FILE_DONE:
      return {
        ...state,
        errorDownloadingFile: false,
        files: action.payload.files
      }
    case DOWNLOAD_FOLDER_DONE:
      return {
        ...state,
        errorDownloadingFolder: false,
        folders: action.payload.folders
      }
    case DOWNLOAD_FOLDER_FAILURE:
      return {
        ...state,
        folders: initialState.folders
      }
    case DOWNLOAD_FILE_FAILURE:
      return {
        ...state,
        files: initialState.files
      }
    default:
      return state
  }
}

export const downloadFileDone = (files) => ({
  type: DOWNLOAD_FILE_DONE,
  payload: {
    files
  }
})

export const downloadFolderDone = (folders) => ({
  type: DOWNLOAD_FOLDER_DONE,
  payload: {
    folders
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

export const downloadFile = () =>
  (dispatch) => {
    dispatch(downloadFileBegin())
    fetchDownloadFile()
      .then(({ files }) => {
        return dispatch(downloadFileDone(files))
      })
      .catch(err => dispatch(downloadFileFailure(err)))
  }

export const downloadFolder = () =>
  (dispatch) => {
    dispatch(downloadFolderBegin())
    fetchDownloadFolder()
      .then(({ folders }) => {
        return dispatch(downloadFolderDone(folders))
      })
      .catch(err => dispatch(downloadFolderFailure(err)))
  }
