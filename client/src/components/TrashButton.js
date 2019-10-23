import React from 'react'

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
