import * as React from 'react'
import { CSSTransition } from 'react-transition-group'
import './description.css'
import { ANIMATIONS_DURATION } from '../variables.ts'

type DescriptionProps = {
  visible: boolean

  text: string
}

export const Description = ({ visible, text }: DescriptionProps): React.ReactElement => {
  const itemRef = React.createRef<HTMLDivElement>()

  return (
    <div className='description-container'>
      <CSSTransition
        nodeRef={itemRef}
        in={visible}
        timeout={ANIMATIONS_DURATION}
        classNames='description'
        unmountOnExit
      >
        <div ref={itemRef} className='description'>
          <div className='description-text'>{text}</div>
        </div>
      </CSSTransition>
    </div>
  )
}
