import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ContainerStyle from './ContainerStyle'
import Button from './Button'
import TrashButton from './TrashButton'
import { thunkDownloadFile, downloadFile } from '../ducks/download.duck'
import { setToggleTrashFile } from '../ducks/trash.duck'

class FileContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  onClickDownload = event => {
    this.props.thunkDownloadFile(this.props.id)
  }

  onClickTrash = event => {
    console.log(`${this.props.fileName} trashed`)
    this.props.file.trashed = true
    this.props.setToggleTrashFile(this.props.file)
  }

  // onClickMove = event => {
  //   console.log('you clicked me')
  // }

  render () {
    return (
      <ContainerStyle>
        <tbody>
          <tr>
            <td className='a'>{this.props.fileName}</td>
            <td>
              <Button text='Download' onClick={this.onClickDownload} />
            </td>
            {/* <td>
              <Button text='Move...' onClick={this.onClickMove} />
            </td> */}
            <td>
              <TrashButton onClick={this.onClickTrash} />
            </td>
          </tr>
        </tbody>
      </ContainerStyle>
    )
  }
}

FileContainer.propTypes = {
  fileName: PropTypes.string.isRequired,
  thunkDownloadFile: PropTypes.func.isRequired,
  setToggleTrashFile: PropTypes.func.isRequired
  // downloadFile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  downloadedFile: state.download.file,
  trashedFile: state.trash.file
})

const mapDispatchToProps = dispatch => ({
  thunkDownloadFile: id => dispatch(thunkDownloadFile(id)),
  setToggleTrashFile: file => dispatch(setToggleTrashFile(file))
  // downloadFile: id => dispatch(downloadFile(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileContainer)
