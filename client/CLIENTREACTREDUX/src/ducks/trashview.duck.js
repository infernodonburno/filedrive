import { fetchTrash } from '../services/api'

export const LOAD_TRASH_BEGIN = 'LOAD_TRASH_BEGIN'
export const LOAD_TRASH_FAILURE = 'LOAD_TRASH_FAILURE'
export const LOAD_TRASH_DONE = 'LOAD_TRASH_DONE'

const initialState = {
  files: [],
  folders: [],
  errorLoadingTrash: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_TRASH_DONE:
      return {
        ...state,
        errorLoadingTrash: false,
        files: action.payload.files,
        folders: action.payload.folders
      }
    case LOAD_TRASH_FAILURE:
      return {
        ...state,
        errorLoadingTrash: true,
        files: initialState.files,
        folders: initialState.folders
      }
    default:
      return state
  }
}

const loadTrashBegin = () => ({
  type: LOAD_TRASH_BEGIN
})

const loadTrashDone = (files, folders) => ({
  type: LOAD_TRASH_DONE,
  payload: {
    files,
    folders
  }
})

const loadTrashFailed = () => ({
  type: LOAD_TRASH_FAILURE
})

export const loadTrash = () => dispatch => {
  dispatch(loadTrashBegin())
  fetchTrash()
    // .then(({ trash }) => {
    .then(({ files, folders }) => {
      console.log('files: ', files)
      console.log('folders: ', folders)
      return dispatch(loadTrashDone(files.files, folders.folders))
    })
    .catch(err => dispatch(loadTrashFailed(err)))
}
