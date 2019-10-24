import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadTrash } from '../ducks/trashview.duck'
import TrashContainer from '../components/TrashContainer'
import StyledCard from '../components/StyledCard'
import Header from '../components/Header'
import NavBar from '../components/Navbar'
class Trash extends React.Component {
  componentDidMount () {
    this.props.loadTrash()
  }

  // onClick = event => {
  //   console.log('trash emptied')
  // }

  render () {
    const trashedFiles = this.props.trashedFiles.map(file => (
      <TrashContainer
        isFile='true'
        file={file}
        key={file.id}
        id={file.id}
        name={file.fileName}
      />
    ))

    const trashedFolders = this.props.trashedFolders.map(folder => (
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
        <NavBar />
        <Header />
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
  trashedFiles: PropTypes.array.isRequired,
  trashedFolders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  trashedFiles: state.trashview.files,
  trashedFolders: state.trashview.folders
})

const mapDispatchToProps = dispatch => ({
  loadTrash: () => dispatch(loadTrash())
  // emptyAllTrash: () => dispatch(emptyAllTrash())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash)
