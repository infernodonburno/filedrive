// REQUESTS
export const rootFile1Req = {
  fileName: 'fileName1',
  data: 'byteArray'
}

const folder1File1Req = {
  fileName: 'folder1fileName1',
  data: 'byteArray'
}

const folder1File2Req = {
  fileName: 'folder1fileName2',
  data: 'byteArray'
}

export const folder1Req = {
  folderName: 'folderName1',
  fileRequests: [folder1File1Req, folder1File2Req]
}

// RESPONSES
export const rootFile1Res = {
  fileName: 'fileName1',
  data: 'byteArray',
  folderID: 0,
  id: 1
}

const folder1File1Res = {
  fileName: 'folder1fileName1',
  data: 'byteArray',
  folderID: 1,
  id: 2
}

const folder1File2Res = {
  fileName: 'folder1fileName2',
  data: 'byteArray',
  folderID: 1,
  id: 3
}

export const folder1Res = {
  folderName: 'folderName1',
  folderID: 1,
  fileRequests: [folder1File1Res, folder1File2Res],
  id: 1
}
