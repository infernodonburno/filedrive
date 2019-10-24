// TODO: REMOVE

import { rootFile1Req, folder1Req } from './data'
import { uploadFileDone, uploadFolderDone } from './ducks/upload.duck'
import { postFile, postFolder, fetchFiles } from './services/api'
import configureStore from './configureStore'

const store = configureStore()

export const uploadFileTest = () => {
  const fileResp = postFile(rootFile1Req)
  //   console.log(fileResp)
  let { fileName } = fileResp
  return store.dispatch(uploadFileDone(fileName))
}

export const uploadFolderTest = () => {
  const folderResp = postFolder(folder1Req)
  //   console.log(folderResp)
  //   console.log(store.dispatch(uploadFolderDone(folderResp)))
  return store.dispatch(uploadFolderDone(folderResp))
}

export const fetchFilesTest = () => {
  fetchFiles()
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => console.log(err))
}
