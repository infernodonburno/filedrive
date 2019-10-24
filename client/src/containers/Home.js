import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadFiles, loadFolders } from '../ducks/config.duck'
import FileContainer from '../components/FileContainer'
import FolderContainer from '../components/FolderContainer'
import UploadButton from '../components/UploadButton'
import StyledCard from '../components/StyledCard'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadFiles(1), this.props.loadFolders()
  }

  render () {
    const files = this.props.files.map(file => (
      <FileContainer
        file={file}
        key={file.id}
        id={file.id}
        fileName={file.fileName}
      />
    ))
    const folders = this.props.folders.map(folder => (
      <FolderContainer
        folder={folder}
        key={folder.id}
        id={folder.id}
        folderName={folder.folderName}
      />
    ))

    return (
      <React.Fragment>
        <UploadButton folderID='1' />
        <StyledCard>
          {folders}
          {files}
        </StyledCard>
      </React.Fragment>
    )
  }
}
Home.propTypes = {
  loadFiles: PropTypes.func.isRequired,
  loadFolders: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.config.files,
  folders: state.config.folders
})

const mapDispatchToProps = dispatch => ({
  loadFiles: folderID => dispatch(loadFiles(folderID)),
  loadFolders: () => dispatch(loadFolders())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
