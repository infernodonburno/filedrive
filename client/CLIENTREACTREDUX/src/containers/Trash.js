import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadTrashedFiles, loadTrashedFolders } from '../ducks/trashview.duck'
// import { emptyAllTrash } from '../ducks/trash.duck'
import TrashContainer from '../components/TrashContainer'
import StyledCard from '../components/StyledCard'
// import Button from '../components/Button'

class Trash extends React.Component {
  componentDidMount () {
    this.props.loadTrashedFiles(), this.props.loadTrashedFolders()
  }

  // onClick = event => {
  //   console.log('trash emptied')
  // }

  render () {
    const trashedFiles = this.props.files.map(file => (
      <TrashContainer
        isFile='true'
        file={file}
        key={file.id}
        id={file.id}
        name={file.fileName}
      />
    ))

    const trashedFolders = this.props.folders.map(folder => (
      <TrashContainer
        isFile='false'
        folder={folder}
        key={folder.id}
        id={folder.id}
        name={folder.folderName}
      />
    ))

    return (
      <React.Fragment>
        <StyledCard>
          {trashedFolders}
          {trashedFiles}
        </StyledCard>
        {/* <Button text='Empty Trash' onClick={this.onClick} /> */}
      </React.Fragment>
    )
  }
}

Trash.propTypes = {
  files: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.trashview.files,
  folders: state.trashview.folders
})

const mapDispatchToProps = dispatch => ({
  loadTrashedFiles: () => dispatch(loadTrashedFiles()),
  loadTrashedFolders: () => dispatch(loadTrashedFolders())
  // emptyAllTrash: () => dispatch(emptyAllTrash())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash)
