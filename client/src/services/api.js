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

export function fetchDownloadFile () {}

export function fetchDownloadFolder () {}

export function fetchFromServer (endpoint, options) {
  let url = [SERVER_ROOT, endpoint].join('/')
  return request(url)
}

export function postFile (file, folderID) {
  return postToServer(`files/${folderID}`, file)
}

export function postFolder () {}

export function postToServer (endpoint, file) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(file)
  }
  console.log(`OPTIONS: ${options.body}`)
  return request(url, options)
}
