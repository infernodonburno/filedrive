import React from 'react'

import Button from './Button'
import PermanentDeleteButton from './PermanentDeleteButton'
import ContainerStyle from './ContainerStyle'

const TrashContainer = props => {
  const onClick = event => {
    // SOME EVENT
    console.log('You clicked me')
  }
  return (
    <ContainerStyle>
      <tbody>
        <tr>
          <td>FILENAMEHERE</td>
          <td>
            <Button text='Restore' onClick={onClick} />
          </td>
          <td>
            <PermanentDeleteButton />
          </td>
        </tr>
      </tbody>
    </ContainerStyle>
  )
}

export default TrashContainer
