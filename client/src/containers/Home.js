import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { loadFiles, loadFolders } from '../ducks/config.duck'
import FileContainer from '../components/FileContainer'
import FolderContainer from '../components/FolderContainer'
import UploadButton from '../components/UploadButton'
import StyledCard from '../components/StyledCard'
import FileUpload from '../utils/upload'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadFiles(), this.props.loadFolders()
  }

  render () {
    const files = this.props.files.map(file => (
      <FileContainer key={file.id} id={file.id} fileName={file.fileName} />
    ))
    const folders = this.props.folders.map(folder => (
      <FolderContainer
        key={folder.id}
        folderID={folder.id}
        folderName={folder.folderName}
      />
    ))

    return (
      <React.Fragment>
        <StyledCard>
          {folders}
          {files}
        </StyledCard>
        <UploadButton />
      </React.Fragment>
    )
  }
}
Home.propTypes = {
  loadFiles: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.config.files,
  folders: state.config.folders
})

const mapDispatchToProps = dispatch => ({
  loadFiles: () => dispatch(loadFiles()),
  loadFolders: () => dispatch(loadFolders())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
