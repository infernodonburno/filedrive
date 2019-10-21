import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { fileDownload } from 'js-file-download'

import Button from './Button'
import TrashButton from './TrashButton'
import { thunkDownloadFile } from '../ducks/download.duck'

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
      this.props.thunkDownloadFile(this.props.id)
      console.log(this.props.file.data)
      // fileDownload(this.props.file.data, this.props.fileName)
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
  file: state.download.file
})

const mapDispatchToProps = dispatch => ({
  thunkDownloadFile: id => dispatch(thunkDownloadFile(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileContainer)
