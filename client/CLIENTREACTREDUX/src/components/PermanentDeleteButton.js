import React from 'react'

const PermanentDeleteButton = props => {
  return (
    <div>
      <input
        type='image'
        src='./resources/x-delete-round-flat-icon-free-download.png'
        onClick={props.onClick}
        
        height='50px'
        alt='deletebutton'
      />
    </div>
  )
}

export default PermanentDeleteButton
