import React from 'react'

import { Button } from './Button'

const UploadButton = props => {
  const onClick = event => {
    console.log('You clicked me')
  }

  return (
    <div>
      <Button onClick={onClick}>Upload</Button>
    </div>
  )
}

export default UploadButton
