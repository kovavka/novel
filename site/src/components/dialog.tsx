import * as React from 'react'
import './dialog.css'

type DialogProps = {
  name: string
  text: string
  options?: string[]
  onOptionClick: () => void
}

export const Dialog = ({
  name,
  text,
  options = [],
  onOptionClick,
}: DialogProps): React.ReactElement => {
  return (
    <div className='dialog-container'>
      <div className='dialog'>
        <div className='dialog-name'>{name}</div>
        <div className='dialog-text'>{text}</div>
        {options.length > 0 && (
          <div className='dialog-options'>
            {options.map(option => (
              <button className='option' onClick={onOptionClick}>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
