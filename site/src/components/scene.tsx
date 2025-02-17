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

const characterNameSpriteMap: Record<string, string> = {
  Шеф: 'chief',
  Героиня: 'fmc',
}

const slides = [
  {
    name: 'Шеф',
    text: 'Девочки, что стоим? Быстро за работу, заказы сами себя не сделают!',
  },
  {
    text: 'Героиня сжала губы и стыдливо отвела глаза.',
  },
  {
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

  if (slide.name === undefined) {
    return (
      <div className='scene' onClick={onClick}>
        <Background path={backgrounds.kitchen} />
        <Description text={slide.text} />
      </div>
    )
  }

  const spriteName = characterNameSpriteMap[slide.name]

  return (
    <div className='scene' onClick={onClick}>
      <Background path={backgrounds.kitchen} />
      <div className='character-container'>
        <Character
          spritePath={characters[spriteName]}
          position={spriteName === 'fmc' ? 'left' : 'right'}
        />
        <Dialog name={slide.name} text={slide.text} />
      </div>
    </div>
  )
}
