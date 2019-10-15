import React from 'react'

import { Button } from './Button'

const DownloadButton = props => {
  const onClick = event => {
    console.log('You clicked me')
  }

  return (
    <div>
      <Button onClick={onClick}>Download</Button>
    </div>
  )
}

export default DownloadButton
