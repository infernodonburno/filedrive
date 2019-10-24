import request from '../utils/request'

const SERVER_ROOT = 'http://localhost:8080'
const header = {
  Authorization:
    'Bearer eyJraWQiOiJpZXA2dmZuSTJGWVN5VDFBS3Z1ZENsRjhfWDh0MFRFT2VvREQtcTFyYXNJIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmhocGxfVDJOZmxtSk9YOGRCN29UYXpPajB4TDlORllHRGJ6Q2xWT1ZSNVkiLCJpc3MiOiJodHRwczovL2Rldi0yMDUwNzMub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNTcxODcwNzA2LCJleHAiOjE1NzE4NzQzMDYsImNpZCI6IjBvYTFtdTUxNzREWXVMSGpNMzU3IiwidWlkIjoiMDB1MW1yeTFlMzdFQ0lTeGEzNTciLCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIl0sInN1YiI6ImZpbGVkcml2ZXByb2plY3Rjb29rc3lzQGdtYWlsLmNvbSJ9.mSJoLjLO31RyDATzMgjpVAqJgTtb29kC5d_3Lw_iD_oniGWI-T-wJpebzKY0NZHjmsL8L7bpfhSoEJsY0DRYULPC_E1maGTCoP8TEhOAHY-D-07OD2bubrsY5nxTn4yUzmmncnMP9p5LraPF_UNXU20KVHZWH8rt4O9VaVZOnIg2MsCagl5uqFykccMg1FyWo81klEyPgT9FBYuP6WdbfDJnKApqlN4BXVWc4kFaCXj4twP5uWrvpoYZPqHaaNvlkHX7PerBy-2KzdYjJWFQnrc1Eyd9BQG1c3wMBCBVEILyK7FhpWvCUPdYKVM66AsIfezrgvn7OYdpFEcOJBYGTQ'
}

// Fetch all files from root folder
export function fetchFiles (folderID) {
  return fetchFromServer(`files/${folderID}/all`)
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

function fetchFromServer (endpoint) {
  let url = [SERVER_ROOT, endpoint].join('/')
  console.log(url)
  const options = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization:
        'Bearer eyJraWQiOiJpZXA2dmZuSTJGWVN5VDFBS3Z1ZENsRjhfWDh0MFRFT2VvREQtcTFyYXNJIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmhocGxfVDJOZmxtSk9YOGRCN29UYXpPajB4TDlORllHRGJ6Q2xWT1ZSNVkiLCJpc3MiOiJodHRwczovL2Rldi0yMDUwNzMub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNTcxODcwNzA2LCJleHAiOjE1NzE4NzQzMDYsImNpZCI6IjBvYTFtdTUxNzREWXVMSGpNMzU3IiwidWlkIjoiMDB1MW1yeTFlMzdFQ0lTeGEzNTciLCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIl0sInN1YiI6ImZpbGVkcml2ZXByb2plY3Rjb29rc3lzQGdtYWlsLmNvbSJ9.mSJoLjLO31RyDATzMgjpVAqJgTtb29kC5d_3Lw_iD_oniGWI-T-wJpebzKY0NZHjmsL8L7bpfhSoEJsY0DRYULPC_E1maGTCoP8TEhOAHY-D-07OD2bubrsY5nxTn4yUzmmncnMP9p5LraPF_UNXU20KVHZWH8rt4O9VaVZOnIg2MsCagl5uqFykccMg1FyWo81klEyPgT9FBYuP6WdbfDJnKApqlN4BXVWc4kFaCXj4twP5uWrvpoYZPqHaaNvlkHX7PerBy-2KzdYjJWFQnrc1Eyd9BQG1c3wMBCBVEILyK7FhpWvCUPdYKVM66AsIfezrgvn7OYdpFEcOJBYGTQ'
    }
  }
  return request(url, options)
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
