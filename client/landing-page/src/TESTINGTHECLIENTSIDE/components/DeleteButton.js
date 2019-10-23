import React from 'react'

const DeleteButton = props => {
  const onClick = event => {
    console.log('Deleted')
  }

  return (
    <div>
      <img src='./src/resources/exit.ico' onClick={onClick} />
    </div>
  )
}

export default DeleteButton
