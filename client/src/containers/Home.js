import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { loadFiles } from '../ducks/config.duck'
import FileContainer from '../components/FileContainer'
import FolderContainer from '../components/FolderContainer'
import UploadButton from '../components/UploadButton'
import MainCard from '../components/MainCard'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadFiles()
  }

  render () {
    const files = this.props.files.map(
      file => <FileContainer key={file.id} files={file.fileName} />
      // console.log(file)
    )
    console.log(this.props.files)

    return <div>{files}</div>
  }
}
Home.propTypes = {
  loadFiles: PropTypes.func.isRequired
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

// const Home = props => {
//   return (
//     <React.Fragment>
//       <MainCard>
//         <FolderContainer />
//         <FileContainer />
//       </MainCard>
//       <UploadButton />
//     </React.Fragment>
//   )
// }

// export default Home
