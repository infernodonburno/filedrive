import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ContainerStyle from './ContainerStyle'
import Button from './Button'
import MoveFileModal from './MoveFileModal'
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

  onClickMove = event => {
    // moveFile(props.file, props.fileID, props.folderID)
    // console.log(props)
    console.log('you clicked me')
  }

  render () {
    console.log(this.props)
    return (
      <ContainerStyle>
        <tbody>
          <tr>
            <td className='a'>
              <MoveFileModal
                folders={this.props.folders}
                file={this.props.file}
                onClickMove={this.onClickMove}
              />
            </td>
            <td>
              <Button text='Download' onClick={this.onClickDownload} />
            </td>
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
  file: PropTypes.object.isRequired,
  folders: PropTypes.array.isRequired,
  thunkDownloadFile: PropTypes.func.isRequired,
  setToggleTrashFile: PropTypes.func.isRequired
  // downloadFile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  downloadedFile: state.download.file,
  trashedFile: state.trash.file,
  moveFile: state.move.file,
  folders: state.config.folders
})

const mapDispatchToProps = dispatch => ({
  thunkDownloadFile: id => dispatch(thunkDownloadFile(id)),
  setToggleTrashFile: file => dispatch(setToggleTrashFile(file)),
  moveFile: (file, fileID, folderID) =>
    dispatch(moveFile(file, fileID, folderID))
  // downloadFile: id => dispatch(downloadFile(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileContainer)
