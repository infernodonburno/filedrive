import React from 'react'
import styled from 'styled-components'

const PermanentDeleteButton = props => {
  const onClick = event => {
    console.log('Trashed')
  }

  return (
    <div>
      <img
        src='./src/resources/x-delete-round-flat-icon-free-download.png'
        onClick={onClick}
      />
    </div>
  )
}

export default PermanentDeleteButton
