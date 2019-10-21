import { combineReducers } from 'redux'
import configReducer from './ducks/config.duck'
import uploadReducer from './ducks/upload.duck'
import downloadReducer from './ducks/download.duck'

export default combineReducers({
  config: configReducer,
  upload: uploadReducer,
  download: downloadReducer
})
