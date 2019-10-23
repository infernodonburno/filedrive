import { patchMoveFile } from '../services/api'

export const MOVE_FILE_PROGRESS = 'MOVE_FILE_PROGRESS'
export const MOVE_FILE_DONE = 'MOVE_FILE_DONE'
export const MOVE_FILE_FAILURE = 'MOVE_FILE_FAILURE'

const initialState = {
  file: {},
  errorMovingFile: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case MOVE_FILE_PROGRESS:
      return {
        ...state,
        errorMovingFile: false,
        file: action.payload.file
      }
    case MOVE_FILE_DONE:
      return {
        ...state,
        errorMovingFile: false
      }
    case MOVE_FILE_FAILURE:
      return {
        ...state,
        errorMovingFile: true,
        file: initialState.file
      }
    default:
      return state
  }
}

const moveFileProgress = file => ({
  type: MOVE_FILE_PROGRESS,
  payload: {
    file
  }
})

const moveFileDone = () => ({
  type: MOVE_FILE_DONE
})

const moveFileFailure = () => ({
  type: MOVE_FILE_FAILURE
})

export const moveFile = (file, fileID, folderID) => dispatch => {
  dispatch(moveFileProgress(file))
  console.log(fileID, folderID)
  patchMoveFile(fileID, folderID)
    .then(response => {
      console.log(response)
      if (response === null) {
        window.location.reload()
        return dispatch(moveFileDone())
      }
    })
    .catch(err => dispatch(moveFileFailure(err)))
}
