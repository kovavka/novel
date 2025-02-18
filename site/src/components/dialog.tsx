import * as React from 'react'
import './dialog.css'
import classnames from 'classnames'

type DialogOption = {
  index: number
  text: string
}

type DialogProps = {
  name: string
  text: string
  italic: boolean
  options?: DialogOption[]
  onOptionClick: (index: number) => void
}

export const Dialog = ({
  name,
  text,
  italic,
  options = [],
  onOptionClick,
}: DialogProps): React.ReactElement => {
  return (
    <div className='dialog-container'>
      <div className='dialog'>
        <div className='dialog-name'>{name}</div>
        <div className={classnames('dialog-text', { 'dialog-text-italic': italic })}>
          {text}
        </div>
        {options.length > 0 && (
          <div className='dialog-options'>
            {options.map(option => (
              <button className='option' onClick={() => onOptionClick(option.index)}>
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
