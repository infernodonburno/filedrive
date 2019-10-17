export const VIEW_FILE_DONE = 'VIEW_FILE'
export const VIEW_FILE_FAILURE = 'VIEW_FILE_BEGIN'
export const VIEW_FILE_BEGIN = 'VIEW_FILE_BEGIN'
export const VIEW_FOLDER_BEGIN = 'VIEW_FOLDER_BEGIN'
export const VIEW_FOLDER_DONE = 'VIEW_FOLDER_DONE'
export const VIEW_FOLDER_FAILURE = 'VIEW_FOLDER_FAILURE'

const initialState = {
  files: [],
  folders: [],
  errorViewingFiles: false,
  errorViewingFolders: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case VIEW_FILE_DONE:
      return {
        ...state,
        errorViewingFiles: false,
        files: action.payload.files
      }
    case VIEW_FOLDER_DONE:
      return {
        ...state,
        errorViewingFolders: false,
        folders: action.payload.files
      }
    case VIEW_FILE_FAILURE:
      return {
        ...state,
        files: initialState.files
      }
    case VIEW_FOLDER_FAILURE:
      return {
        ...state,
        folders: initialState.folders
      }
    default:
      return state
  }
}

export const viewFileDone = (files) => ({
  type: VIEW_FILE_DONE,
  payload: {
    files
  }
})

export const viewFolderDone = (folders) => ({
  type: VIEW_FOLDER_DONE,
  payload: {
    folders
  }
})

const viewFileBegin = () => ({
  type: VIEW_FILE_BEGIN
})

const viewFolderBegin = () => ({
  type: VIEW_FOLDER_BEGIN
})

const viewFileFailure = () => ({
  type: VIEW_FILE_FAILURE
})

const viewFolderFailure = () => ({
  type: VIEW_FOLDER_FAILURE
})

// TODO FETCHES FROM API
