import * as React from 'react'
import './info.css'
import { useEffect, useState } from 'react'
import classnames from 'classnames'

type InfoProps = {
  text: string
}

export const Info = ({ text }: InfoProps): React.ReactElement => {
  const [animationExit, setAnimationExit] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setAnimationExit(true)
    }, 2000)
  }, [])

  return (
    <div className='info-container'>
      <div className={classnames('info', { 'info-exit': animationExit })}>
        <div className='info-text'>{text}</div>
      </div>
    </div>
  )
}
