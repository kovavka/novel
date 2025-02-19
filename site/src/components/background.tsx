import * as React from 'react'
import './background.css'
import { CSSTransition } from 'react-transition-group'
import { ANIMATIONS_DURATION } from '../variables.ts'

type BackgroundProps = {
  visible: boolean
  path: string
}

export const Background = ({ visible, path }: BackgroundProps): React.ReactElement => {
  const itemRef = React.createRef<HTMLDivElement>()

  return (
    <CSSTransition
      nodeRef={itemRef}
      in={visible}
      timeout={ANIMATIONS_DURATION}
      classNames='background'
      unmountOnExit
    >
      <div ref={itemRef} className='background'>
        <img className='background-sprite' src={path} />
      </div>
    </CSSTransition>
  )
}
