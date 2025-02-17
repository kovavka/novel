import * as React from 'react'
import './dialog.css'

type DialogProps = {
  name: string
  text: string
}

export const Dialog = ({ name, text }: DialogProps): React.ReactElement => {
  return (
    <div className='dialog-container'>
      <div className='dialog'>
        <div className='dialog-name'>{name}</div>
        <div className='dialog-text'>{text}</div>
      </div>
    </div>
  )
}
