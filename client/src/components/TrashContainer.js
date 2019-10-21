import React from 'react'
import styled from 'styled-components'

import Button from './Button'
import PermanentDeleteButton from './PermanentDeleteButton'

const FolderContainerStyle = styled.table`
  table {
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

const TrashContainer = props => {
  const onClick = event => {
    // SOME EVENT
    console.log('You clicked me')
  }
  return (
    <FolderContainerStyle>
      <tbody>
        <tr>
          <td>FILENAMEHERE</td>
          <td>
            <Button text='Restore' onClick={onClick} />
          </td>
          <td>
            <PermanentDeleteButton />
          </td>
        </tr>
      </tbody>
    </FolderContainerStyle>
  )
}

export default TrashContainer
