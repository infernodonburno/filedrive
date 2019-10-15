import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
  
`
const formStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: '50vh',
  position: 'none'
}

const ViewFrame = props => (
  <React.Fragment>
    <Container>
      <iframe src='' width='1000' height='100' allowFullScreen webkitallowfullscreen style={formStyle} />
    </Container>
  </React.Fragment>
)

export default ViewFrame
