import React from 'react'

const TrashButton = props => {
  return (
    <div>
      <input
        type='image'
        src='./resources/trashicon.png'
        onClick={props.onClick}
        alt='trashbutton'
      />
    </div>
  )
}

export default TrashButton
