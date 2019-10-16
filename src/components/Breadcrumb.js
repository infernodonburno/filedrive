import React from 'react'
import styled from 'styled-components'

const BreadCrumbStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 50vh;
`
const BreadCrumb = props => {
  return (
    <BreadCrumbStyle>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item active'>Home</li>
      </ol>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'><a href='#'>Home</a></li>
        <li className='breadcrumb-item active'>Folders</li>
      </ol>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'><a href='#'>Home</a></li>
        <li className='breadcrumb-item'><a href='#'>Folders</a></li>
        <li className='breadcrumb-item active'>Files</li>
      </ol>
    </BreadCrumbStyle>
  )
}

export default BreadCrumb
