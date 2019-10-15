import { fetchUploadFile, fetchUploadFolder } from '../services/api'

export const UPLOAD_FILE_DONE = 'UPLOAD_FILE_DONE'
export const UPLOAD_FOLDER_DONE = 'UPLOAD_FOLDER_DONE'
export const UPLOAD_FILE_BEGIN = 'UPLOAD_FILE_BEGIN'
export const UPLOAD_FOLDER_BEGIN = 'UPLOAD_FOLDER_BEGIN'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'
export const UPLOAD_FOLDER_FAILURE = 'UPLOAD_FOLDER_FAILURE'

const initialState = {
  files: [],
  folders: [],
  errorUploadingFiles: false,
  errorUploadingFolders: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE_DONE:
      return {
        ...state,
        errorUploadingFiles: false,
        files: action.payload.files
      }
    case UPLOAD_FOLDER_DONE:
      return {
        ...state,
        errorUploadingFolders: false,
        folders: action.payload.folders
      }
    case UPLOAD_FILE_FAILURE:
      return {
        ...state,
        files: initialState.files
      }
    case UPLOAD_FOLDER_FAILURE:
      return {
        ...state,
        folders: initialState.folders
      }

    default:
      return state
  }
}

export const uploadFileDone = (files) => ({
  type: UPLOAD_FILE_DONE,
  payload: {
    files
  }
})

export const uploadFolderDone = (folders) => ({
  type: UPLOAD_FOLDER_DONE,
  payload: {
    folders
  }
})

const uploadFileBegin = () => ({
  type: UPLOAD_FILE_BEGIN
})

const uploadFolderBegin = () => ({
  type: UPLOAD_FOLDER_BEGIN
})

const uploadFileFailure = () => ({
  type: UPLOAD_FILE_FAILURE
})

const uploadFolderFailure = () => ({
  type: UPLOAD_FOLDER_FAILURE
})

export const downloadFile = () =>
  (dispatch) => {
    dispatch(uploadFileBegin())
    fetchUploadFile()
      .then(({ files }) => {
        return dispatch(uploadFileDone(files))
      })
      .catch(err => dispatch(uploadFileFailure(err)))
  }

export const downloadFolder = () =>
  (dispatch) => {
    dispatch(uploadFolderBegin())
    fetchUploadFolder()
      .then(({ folders }) => {
        return dispatch(uploadFolderDone(folders))
      })
      .catch(err => dispatch(uploadFolderFailure(err)))
  }