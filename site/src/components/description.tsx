import * as React from 'react'
import './description.css'

type DescriptionProps = {
  text: string
}

export const Description = ({ text }: DescriptionProps): React.ReactElement => {
  return (
    <div className='description-container'>
      <div className='description'>
        <div className='description-text'>{text}</div>
      </div>
    </div>
  )
}
