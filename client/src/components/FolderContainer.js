import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import DownloadButton from './DownloadButton'
import TrashButton from './TrashButton'

const FolderContainerStyle = styled.table`
  .a {
    width: 250px;
    height: 25px;
  }
  table {
    min-width: 100%;
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
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
  return (
    <FolderContainerStyle>
      <tbody>
        <tr>
          <td className='a'>{props.folderName}</td>
          <td>
            <DownloadButton />
          </td>
          <td>
            <TrashButton />
          </td>
        </tr>
      </tbody>
    </FolderContainerStyle>
  )
}
FolderContainer.propTypes = {
  folderName: PropTypes.string.isRequired
}

export default FolderContainer
