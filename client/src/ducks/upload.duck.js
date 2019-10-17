import { postFile, postFolder } from '../services/api'

export const UPLOAD_FILE_DONE = 'UPLOAD_FILE_DONE'
export const UPLOAD_FOLDER_DONE = 'UPLOAD_FOLDER_DONE'
export const UPLOAD_FILE_BEGIN = 'UPLOAD_FILE_BEGIN'
export const UPLOAD_FOLDER_BEGIN = 'UPLOAD_FOLDER_BEGIN'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'
export const UPLOAD_FOLDER_FAILURE = 'UPLOAD_FOLDER_FAILURE'

const initialState = {
  file: {},
  folder: {},
  errorUploadingFile: false,
  errorUploadingFolder: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE_DONE:
      return {
        ...state,
        errorUploadingFile: false,
        file: action.payload.file
      }
    case UPLOAD_FOLDER_DONE:
      return {
        ...state,
        errorUploadingFolder: false,
        folder: action.payload.folder
      }
    case UPLOAD_FILE_FAILURE:
      return {
        ...state,
        errorUploadingFile: true,
        file: initialState.file
      }
    case UPLOAD_FOLDER_FAILURE:
      return {
        ...state,
        errorUploadingFolder,
        folder: initialState.folder
      }

    default:
      return state
  }
}

export const uploadFileDone = file => ({
  type: UPLOAD_FILE_DONE,
  payload: {
    file
  }
})

// TODO: Returns a success from server, no object
export const uploadFolderDone = folder => ({
  type: UPLOAD_FOLDER_DONE,
  payload: {
    folder
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

export const uploadFile = file => dispatch => {
  dispatch(uploadFileBegin())
  postFile(file)
    .then(createdFile => {
      return dispatch(uploadFileDone(createdFile))
    })
    .catch(err => dispatch(uploadFileFailure(err)))
}

// TODO: Update returned response
export const uploadFolder = folder => dispatch => {
  dispatch(uploadFolderBegin())
  postFolder(folder)
    .then(response => {
      return dispatch(uploadFolderDone(response))
    })
    .catch(err => dispatch(uploadFolderFailure(err)))
}
