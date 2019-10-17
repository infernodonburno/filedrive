import React from 'react'
import styled from 'styled-components'

import DownloadButton from './DownloadButton'
import TrashButton from './TrashButton'
import ViewButton from './ViewButton'

// TODO: Remove folders in data refs
import { folders } from '../data'

const FolderContainerStyle = styled.table`
.a{
  width:250px;
  height:25px;
}
  table {
    min-width: 100%;
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
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

const FolderContainer = props => {
  const folderNames = folders.map(folder => (
    <tr key={folder.id}>
      <td className='a'>{folder.folderName}</td>
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
    <FolderContainerStyle>
      <tbody>{folderNames}</tbody>
    </FolderContainerStyle>
  )
}

export default FolderContainer
