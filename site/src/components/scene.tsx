import * as React from 'react'
import { Background } from './background.tsx'
import { Character } from './character.tsx'
import { Dialog } from './dialog.tsx'
import { useState } from 'react'
import { backgrounds, characters } from '../images.ts'

type SceneProps = {
  sceneId: string
}

type Characters = 'chief' | 'fmc'

const slides = [
  {
    character: 'chief',
    name: 'Шеф',
    text: 'Девочки, что стоим? Быстро за работу, заказы сами себя не сделают!',
  },
  {
    character: 'fmc',
    name: 'Главная',
    text: 'Простите!',
  },
]

export const Scene = ({}: SceneProps): React.ReactElement => {
  const [slideIndex, setSlideIndex] = useState(0)

  const onClick = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1)
    }
  }
  const slide = slides[slideIndex]

  return (
    <div className='scene' onClick={onClick}>
      <Background path={backgrounds.kitchen} />
      <div className='character-container'>
        <Character
          spritePath={characters[slide.character as Characters]}
          position={slide.character === 'fmc' ? 'left' : 'right'}
        />
        <Dialog name={slide.name} text={slide.text} />
      </div>
    </div>
  )
}
