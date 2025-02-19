import * as React from 'react'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import './character.css'
import { ANIMATIONS_DURATION } from '../variables.ts'
import { characterSprites } from '../images.ts'

type CharacterProps = {
  visible: boolean
  id?: string
  position: 'left' | 'right'
}

export const Character = ({ id, visible, position }: CharacterProps): React.ReactElement => {
  const itemRef = React.createRef<HTMLDivElement>()

  return (
    <CSSTransition
      nodeRef={itemRef}
      in={visible}
      timeout={ANIMATIONS_DURATION}
      classNames='character'
      unmountOnExit
    >
      <div
        ref={itemRef}
        className={classnames('character', {
          'character-right': position === 'right',
          'character-left': position === 'left',
        })}
      >
        {id !== undefined && <img className='character-sprite' src={characterSprites[id]} />}
      </div>
    </CSSTransition>
  )
}
