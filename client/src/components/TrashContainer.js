import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ContainerStyle from './ContainerStyle'
import Button from './Button'
import PermanentDeleteButton from './PermanentDeleteButton'
import { setToggleTrashFile } from '../ducks/trash.duck'

class TrashContainer extends React.Component {
  constructor (props) {
    super(props)
  }
  onClickRestore = event => {
    console.log(`${this.props.name} restored`)
    if (this.props.isFile === 'true') {
      this.props.file.trashed = !this.props.file.trashed
      this.props.setToggleTrashFile(this.props.file)
    }
  }

  onClickDelete = event => {
    console.log('deleted')
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
              <PermanentDeleteButton />
            </td>
          </tr>
        </tbody>
      </ContainerStyle>
    )
  }
}

TrashContainer.propTypes = {
  name: PropTypes.string.isRequired
  // setToggleTrashFile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  restoredFile: state.trash.file
})

const mapDispatchToProps = dispatch => ({
  setToggleTrashFile: file => dispatch(setToggleTrashFile(file))
  // downloadFile: id => dispatch(downloadFile(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrashContainer)
