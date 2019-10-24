import React from 'react'

const TrashButton = props => {
  return (
    <div>
      <input
        type='image'
        src='http://localhost:3000/resources/trashicon.png'
        onClick={props.onClick}
        alt='trashbutton'
      />
    </div>
  )
}

export default TrashButton
