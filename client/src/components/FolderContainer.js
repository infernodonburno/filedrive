import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ContainerStyle from './ContainerStyle'
import Button from './Button'
import TrashButton from './TrashButton'
import { thunkDownloadFolder } from '../ducks/download.duck'
import { setToggleTrashFolder } from '../ducks/trash.duck'

class FolderContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  onClickDownload = event => {
    console.log('This is folderID: ', this.props.id)
    this.props.thunkDownloadFolder(this.props.id)
  }

  onClickTrash = event => {
    console.log(`${this.props.folderName} trashed`)
    this.props.folder.trashed = true
    console.log(this.props.folder)
    this.props.setToggleTrashFolder(this.props.folder)
  }

  render () {
    return (
      <ContainerStyle>
        <tbody>
          <tr>
            <td className='a'>
              <Link to={`folders/${this.props.id}`}>
                {this.props.folderName}
                {console.log('HI')}
              </Link>{' '}
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

FolderContainer.propTypes = {
  id: PropTypes.number.isRequired,
  folderName: PropTypes.string.isRequired,
  thunkDownloadFolder: PropTypes.func.isRequired,
  setToggleTrashFolder: PropTypes.func.isRequired
}

const mapsStateToProps = state => ({
  downloadedFolder: state.download.folder,
  trashedFolder: state.trash.folder
})

const mapDispatchToProps = dispatch => ({
  thunkDownloadFolder: id => dispatch(thunkDownloadFolder(id)),
  setToggleTrashFolder: folder => dispatch(setToggleTrashFolder(folder))
})

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(FolderContainer)
