export const TOGGLE_TRASH_FILE = 'TRASH_FILE'
export const TOGGLE_TRASH_FILE_FAILURE = 'TRASH_FILE_FAILURE'
export const TOGGLE_TRASH_FOLDER = 'TRASH_FOLDER'
export const TOGGLE_TRASH_FOLDER_FAILURE = 'TRASH_FOLDER_FAILURE'
export const DELETE_FILE = 'DELETE_FILE'
export const DELETE_FILE_FAILURE = 'DELETE_FILE_FAILURE'
export const DELETE_FOLDER = 'DELETE_FOLDER'
export const DELETE_FOLDER_FAILURE = 'DELETE_FOLDER_FAILURE'
export const EMPTY_TRASH = 'EMPTY_TRASH'
export const EMPTY_TRASH_FAILURE = 'EMPTY_TRASH_FAILURE'

const initialState = {
  files: [],
  folders: [],
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
          isTrash: true
        }
      }
  }
}
