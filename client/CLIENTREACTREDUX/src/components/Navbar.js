import React from 'react'
import styled from 'styled-components'
import NavItem from './NavItem'

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0px;
  padding: 0px
  width: 100%vw;
  height: 100%;
  background-color: midnightblue;
`

const NavBar = props => {
  return (
    <StyledNavBar>
      <div>
        <NavItem to='/home' exact>
          Home
        </NavItem>
      </div>

      <div>
        <NavItem to='/trash' exact>
          Trash
        </NavItem>
      </div>
    </StyledNavBar>
  )
}

export default NavBar
