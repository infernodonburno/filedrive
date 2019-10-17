export const MOVE_FILE_DONE = 'MOVE_FILE_DONE'
export const MOVE_FILE_FAILURE = 'MOVE_FILE_FAILURE'
export const MOVE_FILE_BEGIN = 'MOVE_FILE_BEGIN'

const initialState = {
  files: [],
  errorMovingFile: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case MOVE_FILE_DONE:
      return {
        ...state,
        errorMovingFiles: false,
        files: action.payload.files
      }
    case MOVE_FILE_FAILURE:
      return {
        ...state,
        files: initialState.files
      }
    default:
      return state
  }
}

export const viewFileDone = (files) => ({
  type: MOVE_FILE_DONE,
  payload: {
    files
  }
})

export const viewFolderDone = () => ({
  type: MOVE_FILE_FAILURE
})

const moveFileBegin = () => ({
  type: MOVE_FILE_BEGIN
})

// TOTO API FETCH FOR FILES TO MOVE