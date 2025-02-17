import * as React from 'react'
import { Background } from './background.tsx'
import { Character } from './character.tsx'
import { Dialog } from './dialog.tsx'
import { useState } from 'react'
import { backgrounds, characters } from '../images.ts'
import { Description } from './description.tsx'
import './scene.css'

type SceneProps = {
  sceneId: string
  onFinish: () => void
}

type Characters = 'chief' | 'fmc'

const slides = [
  {
    character: 'chief',
    name: 'Шеф',
    text: 'Девочки, что стоим? Быстро за работу, заказы сами себя не сделают!',
  },
  {
    text: 'Героиня сжала губы и стыдливо отвела глаза.',
  },
  {
    character: 'fmc',
    name: 'Героиня',
    text: 'Простите!',
  },
]

export const Scene = ({ onFinish }: SceneProps): React.ReactElement => {
  const [slideIndex, setSlideIndex] = useState(0)

  const onClick = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1)
    } else {
      onFinish()
    }
  }
  const slide = slides[slideIndex]

  return (
    <div className='scene' onClick={onClick}>
      <Background path={backgrounds.kitchen} />
      {slide.character !== undefined ? (
        <div className='character-container'>
          <Character
            spritePath={characters[slide.character as Characters]}
            position={slide.character === 'fmc' ? 'left' : 'right'}
          />
          <Dialog name={slide.name} text={slide.text} />
        </div>
      ) : (
        <Description text={slide.text} />
      )}
    </div>
  )
}
