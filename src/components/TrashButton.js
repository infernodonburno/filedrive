import React from 'react'
import styled from 'styled-components'

const TrashButton = props => {
  const onClick = event => {
    console.log('Trashed')
  }

  return (
    <div>
      <img src='./src/resources/trashicon.png' onClick={onClick} />
    </div>
  )
}

export default TrashButton
