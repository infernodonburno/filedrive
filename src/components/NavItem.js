import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavItem = styled(NavLink)`
  font-size: 30pt;
  text-decoration: none;
  color: white;
  padding: 10px;
  &.active {
    color: #fff;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff0080, 0 0 30px #ff0080, 0 0 40px #ff0080, 0 0 55px #ff0080, 0 0 75px #ff0080;
   
  }
`

export default NavItem
