import * as React from 'react'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import { ANIMATIONS_DURATION } from '../variables.ts'
import './dialog.css'

export type DialogOption = {
  index: number
  text: string
}

type DialogProps = {
  visible: boolean
  name: string
  text: string
  italic: boolean
  options?: DialogOption[]
  onOptionClick: (index: number) => void
}

export const Dialog = ({
  visible,
  name,
  text,
  italic,
  options = [],
  onOptionClick,
}: DialogProps): React.ReactElement => {
  const itemRef = React.createRef<HTMLDivElement>()

  return (
    <div className='dialog-container'>
      <CSSTransition
        nodeRef={itemRef}
        in={visible}
        timeout={ANIMATIONS_DURATION}
        classNames='dialog'
        unmountOnExit
      >
        <div ref={itemRef} className='dialog'>
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
      </CSSTransition>
    </div>
  )
}
