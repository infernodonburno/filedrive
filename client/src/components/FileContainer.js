import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import DownloadButton from './DownloadButton'
import TrashButton from './TrashButton'

const FileContainerStyle = styled.table`
  .a {
    width: 250px;
    height: 25px;
  }
  table {
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

const FileContainer = props => {
  return (
    <FileContainerStyle>
      <tbody>
        <tr>
          <td className='a'>{props.fileName}</td>
          <td>
            <DownloadButton />
          </td>
          <td>
            <TrashButton />
          </td>
        </tr>
      </tbody>
    </FileContainerStyle>
  )
}
FileContainer.propTypes = {
  fileName: PropTypes.string.isRequired
}

export default FileContainer
