import React from 'react'
import styled from 'styled-components'

import DownloadButton from './DownloadButton'
import TrashButton from './TrashButton'
import ViewButton from './ViewButton'

const FolderContainerStyle = styled.table`
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
`

const FolderContainer = props => {
  return (
    <FolderContainerStyle>
      <tr>
        <td>FILENAMEHERE</td>
        <td><DownloadButton /></td>
        <td><ViewButton /></td>
        <td><TrashButton /></td>
      </tr>
    </FolderContainerStyle>
  )
}

export default FolderContainer
