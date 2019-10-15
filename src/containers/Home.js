import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadFiles } from '../ducks/config.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadFiles()
  }

  render () {
    const files = this.props.files
    console.log(files)

    return <div>It worked</div>
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
