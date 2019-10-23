import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { moveFile } from '../ducks/move.duck'
import Link from './Link'
import ContainerStyle from './ContainerStyle'

class MoveContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  onClickMove = event => {
    this.props.moveFile(this.props.file, this.props.fileID, this.props.folderID)
    console.log(this.props)
    console.log('you clicked me')
  }
  render () {
    return (
      <ContainerStyle>
        <tbody>
          <tr>
            <td>
              <Link onClick={this.onClickMove}>{this.props.folderName}</Link>
            </td>
          </tr>
        </tbody>
      </ContainerStyle>
    )
  }
}

MoveContainer.propTypes = {
  file: PropTypes.object.isRequired,
  folderName: PropTypes.string.isRequired,
  fileID: PropTypes.number.isRequired,
  folderID: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  moveFile: state.move.file
})

const mapDispatchToProps = dispatch => ({
  moveFile: (file, fileID, folderID) =>
    dispatch(moveFile(file, fileID, folderID))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveContainer)
