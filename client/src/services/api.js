import request from '../utils/request'

const SERVER_ROOT = 'http://localhost:8080'

// Fetch all files from root folder
export function fetchFiles (folderID) {
  return fetchFromServer(`folders/${folderID}`)
}

// Fetch all folders from root
export function fetchFolders () {
  return fetchFromServer('folders')
}

// Download single file
export function fetchDownloadFile (id) {
  return fetchFromServer(`files/${id}`)
}

// Download folder
export function fetchDownloadFolder (id) {
  return fetchFromServer(`folders/${id}`)
}

// Fetch all files marked as trash
export function fetchTrashFiles () {
  return fetchFromServer('files/trash')
}

// Fetch all folders marked as trash
export function fetchTrashFolders () {
  return fetchFromServer('folders/trash')
}

function fetchFromServer (endpoint, options) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  return request(url)
}

export function postFile (file, folderID) {
  return postToServer(`files/${folderID}`, file)
}

export function postFolder (folderReq) {
  return postToServer('folders', folderReq)
}

function postToServer (endpoint, req) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  }
  return request(url, options)
}

export function patchTrashFile (file) {
  let endpoint = `files/${file.id}/trash`
  return patchToServer(endpoint, { trashed: file.trashed })
}

export function patchTrashFolder (folder) {
  console.log('folder: ', folder)
  let endpoint = `folders/${folder.id}/trash`
  return patchToServer(endpoint, { trashed: folder.trashed })
}

export function patchMoveFile (fileID, folderID) {
  return patchToServer(`/files/${fileID}/${folderID}/move`)
}

function patchToServer (endpoint, req) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  }
  return request(url, options)
}

export function deleteFileFromServer (id) {
  return deleteFromServer(`files/${id}/trash`)
}

export function deleteFolderFromServer (id) {
  return deleteFromServer(`folders/${id}/trash`)
}

function deleteFromServer (endpoint) {
  let url = [SERVER_ROOT, endpoint].join('/')
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request(url, options)
}
