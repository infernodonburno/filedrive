import { combineReducers } from 'redux'
import configReducer from './ducks/config.duck'
import folderReducer from './ducks/folderview.duck'
import moveReducer from './ducks/move.duck'
import uploadReducer from './ducks/upload.duck'
import downloadReducer from './ducks/download.duck'
import trashviewReducer from './ducks/trashview.duck'
import trashReducer from './ducks/trash.duck'

export default combineReducers({
  config: configReducer,
  folder: folderReducer,
  move: moveReducer,
  upload: uploadReducer,
  download: downloadReducer,
  trashview: trashviewReducer,
  trash: trashReducer
})
