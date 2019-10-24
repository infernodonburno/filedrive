import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ContainerStyle from './ContainerStyle'
import Button from './Button'
import MoveFileModal from './MoveFileModal'
import TrashButton from './TrashButton'
import { thunkDownloadFile } from '../ducks/download.duck'
import { setToggleTrashFile } from '../ducks/trash.duck'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';


class FileContainer extends React.Component {
  onClickDownload = event => {
    this.props.thunkDownloadFile(this.props.id)
  }

  onClickTrash = event => {
    console.log(`${this.props.fileName} trashed`)
    this.props.file.trashed = true
    this.props.setToggleTrashFile(this.props.file)
  }

  render () {
    console.log(this.props)
    return (
      <ContainerStyle>
        <Table  hover variant="light">
        <tbody>
          <tr>
            <td className='a'>
              <MoveFileModal
                folders={this.props.folders}
                file={this.props.file}
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
        </Table>
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
  setToggleTrashFile: file => dispatch(setToggleTrashFile(file))
  // downloadFile: id => dispatch(downloadFile(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileContainer)
