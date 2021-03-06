import React from 'react'

const TrashButton = props => {
  return (
    <div>
      <input
        type='image'
        src='http://localhost:8081/src/resources/trashicon.png'
        onClick={props.onClick}
      />
    </div>
  )
}

export default TrashButton
