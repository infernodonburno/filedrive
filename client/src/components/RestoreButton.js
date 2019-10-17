import React from 'react'
import styled from 'styled-components'

const RestoreButtonStyle = styled.button`
  background: gray;
  font-size: 20px;
  padding: 15px 15px;
  border-radius: 50%;
`

const RestoreButton = props => {
  const onClick = event => {
    console.log('You clicked me')
  }

  return (
    <div>
      <RestoreButtonStyle onClick={onClick}>Restore</RestoreButtonStyle>
    </div>
  )
}

export default RestoreButton
