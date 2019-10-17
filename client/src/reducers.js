import { combineReducers } from 'redux'
import configReducer from './ducks/config.duck'
import uploadReducer from './ducks/upload.duck'

export default combineReducers({
  config: configReducer,
  upload: uploadReducer
})
