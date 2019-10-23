import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadFiles } from '../ducks/folderview.duck'
import FileContainer from '../components/FileContainer'
import UploadButton from '../components/UploadButton'
import StyledCard from '../components/StyledCard'

class Folder extends React.Component {
  componentDidMount () {
    this.props.loadFiles(this.props.match.params.id)
  }

  render () {
    console.log(this.props.match.params.id)
    const files = this.props.files.map(file => (
      <FileContainer
        file={file}
        key={file.id}
        id={file.id}
        fileName={file.fileName}
      />
    ))
    return (
      <React.Fragment>
        <StyledCard>{files}</StyledCard>
        <UploadButton />
      </React.Fragment>
    )
  }
}

Folder.propTypes = {
  loadFiles: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired
  // folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.config.files
  // folders: state.config.folders
})

const mapDispatchToProps = dispatch => ({
  loadFiles: id => dispatch(loadFiles(id))
  // loadFolders: () => dispatch(loadFolders())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder)
