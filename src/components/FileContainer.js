import React from 'react'
import styled from 'styled-components'

import DownloadButton from './DownloadButton'
import TrashButton from './TrashButton'
import ViewButton from './ViewButton'

import { rootFiles as files } from '../data'

const FileContainerStyle = styled.table`
  .a{
    width:250px;
    height:25px;
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
  const fileNames = files.map(file => (
    <tr key={file.id}>
      <td className='a'>{file.fileName}</td>
      <td>
        <DownloadButton />
      </td>
      <td>
        <ViewButton />
      </td>
      <td>
        <TrashButton />
      </td>
    </tr>
  ))
  return (
    <FileContainerStyle>
      <tbody>{fileNames}</tbody>
    </FileContainerStyle>
  )
}

export default FileContainer
