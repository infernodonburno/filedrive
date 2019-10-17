import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  
`
const Header = props => (
  <Container>
    <h1>File Drive</h1>
    <br />
  </Container>
)

export default Header
