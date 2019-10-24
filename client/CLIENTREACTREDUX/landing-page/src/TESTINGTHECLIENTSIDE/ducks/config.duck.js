import { fetchFiles, fetchFolders } from '../services/api'

export const LOAD_FILES_BEGIN = 'LOAD_FILES_BEGIN'
export const LOAD_FILES_FAILURE = 'LOAD_FILES_FAILURE'
export const LOAD_FILES_DONE = 'LOAD_FILES_DONE'
export const LOAD_FOLDERS_BEGIN = 'LOAD_FOLDERS_BEGIN'
export const LOAD_FOLDERS_FAILURE = 'LOAD_FOLDERS_FAILURE'
export const LOAD_FOLDERS_DONE = 'LOAD_FOLDERS_DONE'

const initialState = {
  files: [],
  folders: [],
  errorLoadingFiles: false,
  errorLoadingFolders: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_FILES_DONE:
      return {
        ...state,
        errorLoadingFiles: false,
        files: action.payload.files
      }
    case LOAD_FOLDERS_DONE:
      return {
        ...state,
        errorLoadingFolders: false,
        folders: action.payload.folders
      }
    case LOAD_FILES_FAILURE:
      return {
        ...state,
        errorLoadingFiles: true,
        files: initialState.files
      }
    case LOAD_FOLDERS_FAILURE:
      return {
        ...state,
        errorLoadingFolders: true,
        folders: initialState.folders
      }
    default:
      return state
  }
}

const loadFilesBegin = () => ({
  type: LOAD_FILES_BEGIN
})

const loadFilesDone = files => ({
  type: LOAD_FILES_DONE,
  payload: {
    files
  }
})

const loadFilesFailed = () => ({
  type: LOAD_FILES_FAILURE
})

const loadFoldersBegin = () => ({
  type: LOAD_FOLDERS_BEGIN
})

const loadFoldersDone = folders => ({
  type: LOAD_FOLDERS_DONE,
  payload: {
    folders
  }
})

const loadFoldersFailed = () => ({
  type: LOAD_FOLDERS_FAILURE
})

export const loadFiles = folderID => dispatch => {
  dispatch(loadFilesBegin())
  fetchFiles(folderID)
    .then(({ files }) => {
      return dispatch(loadFilesDone(files))
    })
    .catch(err => dispatch(loadFilesFailed(err)))
}

export const loadFolders = () => dispatch => {
  dispatch(loadFoldersBegin())
  fetchFolders()
    .then(({ folders }) => {
      return dispatch(loadFoldersDone(folders))
    })
    .catch(err => dispatch(loadFoldersFailed(err)))
}
