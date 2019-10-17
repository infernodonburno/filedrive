import React from 'react'
import styled from 'styled-components'

import DownloadButton from './DownloadButton'
import TrashButton from './TrashButton'

// TODO: Remove data and test imports
import { rootFiles as files } from '../data'
import { fetchFilesTest } from '../test'

const FileContainerStyle = styled.table`
  .a {
    width: 250px;
    height: 25px;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100vw;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`

const FileContainer = props => {
  const displayFiles = () => {
    const response = fetchFilesTest()
  }
  const fileNames = files.map(file => (
    <tr key={file.id}>
      <td className='a'>{file.fileName}</td>
      <td>
        <DownloadButton />
      </td>
      <td>
        <TrashButton />
      </td>
    </tr>
  ))
  return (
    <React.Fragment>
      <FileContainerStyle>
        <tbody>{fileNames}</tbody>
      </FileContainerStyle>
      <button onClick={displayFiles}>DisplayFiles</button>
    </React.Fragment>
  )
}

export default FileContainer
