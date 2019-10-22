import { patchTrashFile } from '../services/api'

export const TOGGLE_TRASH_FILE = 'TOGGLE_TRASH_FILE'
export const TOGGLE_TRASH_FILE_FAILURE = 'TRASH_FILE_FAILURE'
export const TOGGLE_TRASH_FOLDER = 'TOGGLE_TRASH_FOLDER'
export const TOGGLE_TRASH_FOLDER_FAILURE = 'TRASH_FOLDER_FAILURE'
export const DELETE_FILE = 'DELETE_FILE'
export const DELETE_FILE_FAILURE = 'DELETE_FILE_FAILURE'
export const DELETE_FOLDER = 'DELETE_FOLDER'
export const DELETE_FOLDER_FAILURE = 'DELETE_FOLDER_FAILURE'
export const EMPTY_TRASH = 'EMPTY_TRASH'
export const EMPTY_TRASH_FAILURE = 'EMPTY_TRASH_FAILURE'

const initialState = {
  file: {},
  folder: {},
  errorTogglingTrash: false,
  errorDeletingFile: false,
  errorDeletingFolder: false,
  errorEmptyingTrash: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TRASH_FILE:
      return {
        ...state,
        errorTogglingTrash: false,
        file: {
          trashed: !trashed
        }
      }
    case TOGGLE_TRASH_FILE_FAILURE:
      return {
        ...state,
        errorTogglingTrash: true,
        file: initialState.file
      }
    default:
      return state
  }
}

const toggleTrashFile = file => ({
  type: TOGGLE_TRASH_FILE,
  payload: {
    file
  }
})

const toggleTrashFileFailure = () => ({
  type: TOGGLE_TRASH_FILE_FAILURE
})

const deleteFile = file => ({
  type: DELETE_FILE,
  payload: {
    file
  }
})

const deleteFileFailure = () => ({
  type: DELETE_FILE_FAILURE
})

const toggleTrashFolder = folder => ({
  type: TOGGLE_TRASH_FOLDER,
  payload: {
    folder
  }
})

const toggleTrashFolderFailure = () => ({
  type: TOGGLE_TRASH_FOLDER_FAILURE
})

const deleteFolder = folder => ({
  type: DELETE_FOLDER,
  payload: {
    folder
  }
})

const deleteFolderFailure = () => ({
  type: DELETE_FOLDER_FAILURE
})

const emptyTrash = () => ({
  type: EMPTY_TRASH
})

const emptyTrashFailure = () => ({
  type: EMPTY_TRASH_FAILURE
})

export const setToggleTrashFile = file => dispatch => {
  dispatch(toggleTrashFile)
  patchTrashFile(file)
    .then(response => {
      console.log(response)
    })
    .catch(err => dispatch(toggleTrashFileFailure(err)))
}
