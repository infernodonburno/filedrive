import React from 'react'
import styled from 'styled-components'

const DownloadButton = props => {
  const onClick = event => {
    console.log('You clicked me')
  }

  return (
    <div>
      <button onClick={onClick}>DownloadButton</button>
    </div>
  )
}

export default DownloadButton
