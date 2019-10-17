import request from '../utils/request'

// const headers = new Headers()
const SERVER_ROOT = 'http://localhost:8080'
// const requestOptions = {
//   method: 'GET',
//   headers: headers,
//   mode: 'no-cors',
//   cache: 'default'
// }

// Fetch all files from root folder
export function fetchFiles () {
  return fetchFromServer('folders/1')
}

export function fetchFolders () {}

export function fetchDownloadFile () {}

export function fetchDownloadFolder () {}

export function fetchFromServer (endpoint) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  return request(url)
}

export function postFile () {}

export function postFolder () {}
