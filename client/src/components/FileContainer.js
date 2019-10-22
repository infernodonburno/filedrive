import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ContainerStyle from './ContainerStyle'
import Button from './Button'
import TrashButton from './TrashButton'
import { thunkDownloadFile, downloadFile } from '../ducks/download.duck'

// const FileContainer = props => {
class FileContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  onClick = event => {
    console.log(this.props.id)
    // console.log(this.props)
    this.props.thunkDownloadFile(this.props.id)
    // fileDownload(
    //   this.props.thunkDownloadFile(this.props.id).data,
    //   this.props.thunkDownloadFile(this.props.id).fileName
    // )
    // this.props.downloadFile(this.props.id)
    // fileDownload(this.props.file.data, this.props.fileName)
  }

  render () {
    // const onClick = event => {
    //   console.log(this.props.id)
    //   // console.log(this.props)
    //   thunkDownloadFile(this.props.id)

    //   // fileDownload(this.props.file.data, this.props.fileName)
    // }
    console.log(this.props.file.data)
    return (
      <ContainerStyle>
        <tbody>
          <tr>
            <td className='a'>{this.props.fileName}</td>
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

FileContainer.propTypes = {
  fileName: PropTypes.string.isRequired,
  thunkDownloadFile: PropTypes.func.isRequired
  // downloadFile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  file: state.download.file
})

const mapDispatchToProps = dispatch => ({
  thunkDownloadFile: id => dispatch(thunkDownloadFile(id))
  // downloadFile: id => dispatch(downloadFile(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileContainer)
