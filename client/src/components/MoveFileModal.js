import React from 'react'
import Popup from 'reactjs-popup'

import Link from './Link'
import MoveContainer from './MoveContainer'

const folderContainer = props =>
  props.folders.map(folder => (
    <MoveContainer
      key={folder.id}
      folderID={folder.id}
      folderName={folder.folderName}
      file={props.file}
      fileID={props.file.id}
      onClick={props.onClickMove}
    >
      {console.log(props)}
    </MoveContainer>
  ))

const MoveFileModal = props => (
  <Popup trigger={<Link> {props.file.fileName} </Link>} modal>
    {close => (
      <div>
        {console.log(props)}
        {folderContainer(props)}
      </div>
    )}
  </Popup>
)

export default MoveFileModal
