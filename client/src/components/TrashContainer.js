import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ContainerStyle from './ContainerStyle'
import Button from './Button'
import PermanentDeleteButton from './PermanentDeleteButton'
import {
  setToggleTrashFile,
  setToggleTrashFolder,
  destroyFile,
  destroyFolder
} from '../ducks/trash.duck'

class TrashContainer extends React.Component {
  constructor (props) {
    super(props)
  }
  onClickRestore = event => {
    console.log(`${this.props.name} restored`)
    if (this.props.isFile === 'true') {
      this.props.file.trashed = false
      this.props.setToggleTrashFile(this.props.file)
    }
    if (this.props.isFile === 'false') {
      this.props.folder.trashed = false
      this.props.setToggleTrashFolder(this.props.folder)
    }
  }

  onClickDelete = event => {
    console.log('deleted')
    if (this.props.isFile === 'true') {
      this.props.destroyFile(this.props.file.id)
    }
    if (this.props.isFile === 'false') {
      this.props.destroyFolder(this.props.folder.id)
    }
  }

  render () {
    return (
      <ContainerStyle>
        <tbody>
          <tr>
            <td className='a'>{this.props.name}</td>
            <td>
              <Button text='Restore' onClick={this.onClickRestore} />
            </td>
            <td>
              <PermanentDeleteButton onClick={this.onClickDelete} />
            </td>
          </tr>
        </tbody>
      </ContainerStyle>
    )
  }
}

TrashContainer.propTypes = {
  name: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  restoredFile: state.trash.file,
  restoredFolder: state.trash.folder
})

const mapDispatchToProps = dispatch => ({
  setToggleTrashFile: file => dispatch(setToggleTrashFile(file)),
  setToggleTrashFolder: folder => dispatch(setToggleTrashFolder(folder)),
  destroyFile: id => dispatch(destroyFile(id)),
  destroyFolder: id => dispatch(destroyFolder(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrashContainer)
