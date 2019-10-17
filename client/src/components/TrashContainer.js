import React from 'react'
import styled from 'styled-components'

import RestoreButton from './RestoreButton'
import ViewButton from './ViewButton'
import PermanentDeleteButton from './PermanentDeleteButton'

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

const TrashContainer = props => {
  return (
    <FolderContainerStyle>
      <tr>
        <td>FILENAMEHERE</td>
        <td><RestoreButton /></td>
        <td><ViewButton /></td>
        <td><PermanentDeleteButton /></td>
      </tr>
    </FolderContainerStyle>
  )
}

export default TrashContainer
