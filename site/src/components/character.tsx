import * as React from 'react'
import classnames from 'classnames'
import './character.css'

type CharacterProps = {
  spritePath: string
  position: 'left' | 'right'
}

export const Character = ({ spritePath, position }: CharacterProps): React.ReactElement => {
  return (
    <div
      className={classnames('character', {
        'character-right': position === 'right',
        'character-left': position === 'left',
      })}
    >
      <img className='character-sprite' src={spritePath} />
    </div>
  )
}
