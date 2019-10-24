import React from 'react'
import styled from 'styled-components'

const ButtonStyle = styled.button`
  display: inline-block;
  background: gray;
  font-size: 20px;
  padding: 15px 15px;
  border-radius: 50%;
`

const Button = props => {
  return (
    <div>
      <ButtonStyle onClick={props.onClick}>{props.text}</ButtonStyle>
    </div>
  )
}

export default Button
