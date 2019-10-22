import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ContainerStyle from './ContainerStyle'
import Button from './Button'
import TrashButton from './TrashButton'

import { thunkDownloadFolder } from '../ducks/download.duck'

// const FolderContainer = props => {
class FolderContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  onClick = event => {
    console.log('This is folderID: ', this.props.folderID)
    this.props.thunkDownloadFolder(this.props.folderID)
  }
  render () {
    // console.log(this.props.folder.data)
    return (
      <ContainerStyle>
        <tbody>
          <tr>
            <td className='a'>{this.props.folderName}</td>
            <td>
              <Button text='Download' onClick={this.onClick} />
            </td>
            <td>
              <TrashButton />
            </td>
          </tr>
        </tbody>
      </ContainerStyle>
    )
  }
}

FolderContainer.propTypes = {
  folderID: PropTypes.number.isRequired,
  folderName: PropTypes.string.isRequired,
  thunkDownloadFolder: PropTypes.func.isRequired
}

const mapsStateToProps = state => ({
  folder: state.download.folder
})

const mapDispatchToProps = dispatch => ({
  thunkDownloadFolder: folderID => dispatch(thunkDownloadFolder(folderID))
})

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(FolderContainer)
