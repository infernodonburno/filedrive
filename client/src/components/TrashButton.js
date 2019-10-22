import React from 'react'

import { toggleTrashFile } from '../ducks/trash.duck'

const TrashButton = props => {
  return (
    <div>
      <input
        type='image'
        src='./src/resources/trashicon.png'
        onClick={props.onClick}
      />
    </div>
  )
}

export default TrashButton
