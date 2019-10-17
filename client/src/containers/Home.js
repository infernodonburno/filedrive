import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { loadFiles } from '../ducks/config.duck'
import FileContainer from '../components/FileContainer'
import FolderContainer from '../components/FolderContainer'
import UploadButton from '../components/UploadButton'
import StyledCard from '../components/StyledCard'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadFiles()
  }

  render () {
    const files = this.props.files.map(file => (
      <FileContainer key={file.id} fileName={file.fileName} />
    ))
    return (
      <React.Fragment>
        //{' '}
        <StyledCard>
          {files}
          //{' '}
        </StyledCard>
        // <UploadButton />
        //{' '}
      </React.Fragment>
    )
  }
}
Home.propTypes = {
  loadFiles: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  files: state.config.files
})

const mapDispatchToProps = dispatch => ({
  loadFiles: () => dispatch(loadFiles())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
