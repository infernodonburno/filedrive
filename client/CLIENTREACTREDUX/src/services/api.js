import request from '../utils/request'
import { Authorization as token, username } from './auth'

const SERVER_ROOT = 'http://localhost:8080'
const headers = {
  'Access-Control-Allow-Origin': '*',
  Authorization: token
}

// Fetch all files from specified folder
export function fetchFiles (folderID) {
  return fetchFromServer(`files/${username}/${folderID}/all`)
}

// Fetch all folders from specifed folder
export function fetchFolders (folderID) {
  folderID = 1 // TODO: REMOVE
  return fetchFromServer(`folders/${username}/${folderID}/all`)
}

// Download single file
export function fetchDownloadFile (id) {
  return fetchFromServer(`files/${username}/${id}`)
}

// Download folder
export function fetchDownloadFolder (id) {
  return fetchFromServer(`folders/${username}/${id}`)
}

// Fetch all items marked as trash
export function fetchTrash () {
  return fetchFromServer(`trash/${username}`)
}

function fetchFromServer (endpoint) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  const options = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: token
    }
  }
  console.log(options)
  return request(url, options)
}

export function postFile (file, folderID) {
  return postToServer(`files/${username}/${folderID}`, file)
}

export function postFolder (folderReq, folderID) {
  folderID = 1 // TODO: REMOVE
  return postToServer(`folders/${username}/${folderID}`, folderReq)
}

function postToServer (endpoint, req) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(req)
  }
  return request(url, options)
}

export function patchTrashFile (file) {
  let endpoint = `files/${username}/${file.id}/trash`
  return patchToServer(endpoint, { trashed: file.trashed })
}

export function patchTrashFolder (folder) {
  let endpoint = `folders/${username}/${folder.id}/trash`
  return patchToServer(endpoint, { trashed: folder.trashed })
}

export function patchMoveFile (fileID, folderID) {
  return patchToServer(`/files/${username}/${fileID}/${folderID}/move`)
}

export function patchMoveFolder (thisFolderID, moveFolderID) {
  return patchToServer(
    `/files/${username}/${thisFolderID}/${moveFolderID}/move`
  )
}

function patchToServer (endpoint, req) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(req)
  }
  return request(url, options)
}

export function deleteFileFromServer (id) {
  return deleteFromServer(`files/${username}/${id}/delete`)
}

export function deleteFolderFromServer (id) {
  return deleteFromServer(`folders/${username}/${id}/delete`)
}

function deleteFromServer (endpoint) {
  let url = [SERVER_ROOT, endpoint].join('/')
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }
  return request(url, options)
}
