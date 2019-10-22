import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import ContainerStyle from './ContainerStyle'
import Button from './Button'
import TrashButton from './TrashButton'

const FolderContainer = props => {
  const onClick = event => {
    // SOME EVENT
    console.log('You clicked me')
  }
  return (
    <ContainerStyle>
      <tbody>
        <tr>
          <td className='a'>{props.folderName}</td>
          <td>
            <Button text='Download' onClick={onClick} />
          </td>
          <td>
            <TrashButton />
          </td>
        </tr>
      </tbody>
    </ContainerStyle>
  )
}
FolderContainer.propTypes = {
  keyProp: PropTypes.number.isRequired,
  folderName: PropTypes.string.isRequired
}

export default FolderContainer
