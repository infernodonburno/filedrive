import React from 'react'
import styled from 'styled-components'

const ViewButtonStyle = styled.button`
  background: gray;
  font-size: 20px;
  padding: 15px 15px;
  border-radius: 50%;
`

const ViewButton = props => {
  const onClick = event => {
    console.log('You clicked me')
  }

  return (
    <div>
      <ViewButtonStyle onClick={onClick}>View</ViewButtonStyle>
    </div>
  )
}

export default ViewButton
