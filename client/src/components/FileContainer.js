import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { fileDownload } from 'js-file-download'

import Button from './Button'
import TrashButton from './TrashButton'
import { downloadFile } from '../ducks/download.duck'

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

// const FileContainer = props => {
class FileContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const onClick = event => {
      console.log(this.props.id)
      console.log('You clicked me')
      this.props.downloadFile(this.props.id)
    }
    return (
      <FileContainerStyle>
        <tbody>
          <tr>
            <td className='a'>{this.props.fileName}</td>
            <td>
              <Button text='Download' onClick={onClick} />
            </td>
            <td>
              <TrashButton />
            </td>
          </tr>
        </tbody>
      </FileContainerStyle>
    )
  }
}

FileContainer.propTypes = {
  id: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  files: state.config.files,
  folders: state.config.folders
})

const mapDispatchToProps = dispatch => ({
  downloadFile: id => dispatch(downloadFile(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileContainer)
