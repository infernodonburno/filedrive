import request from '../utils/request'

const SERVER_ROOT = 'http://localhost:8080'

// Fetch all files from root folder
export function fetchFiles () {
  return fetchFromServer('folders/1')
}

// Fetch all folders from root
export function fetchFolders () {
  return fetchFromServer('folders')
}

export function fetchDownloadFile (id) {
  return fetchFromServer(`files/${id}`)
}

export function fetchDownloadFolder (folderID) {
  return fetchFromServer(`folders/${folderID}`)
}

export function fetchFromServer (endpoint, options) {
  let url = [SERVER_ROOT, endpoint].join('/')
  return request(url)
}

export function postFile (file, folderID) {
  return postToServer(`files/${folderID}`, file)
}

export function postFolder (folderReq) {
  return postToServer(`folders`, folderReq)
}

export function postToServer (endpoint, req) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  }
  console.log(`OPTIONS: ${options.body}`)
  return request(url, options)
}
