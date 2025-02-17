import * as React from 'react'
import classnames from 'classnames'

type CharacterProps = {
  spritePath: string
  position: 'left' | 'right'
}

export const Character = ({ spritePath, position }: CharacterProps): React.ReactElement => {
  return (
    <div
      className={classnames('character', {
        character__right: position === 'right',
        character__left: position === 'left',
      })}
    >
      <img className='character--sprite' src={spritePath} />
    </div>
  )
}
