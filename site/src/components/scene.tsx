import * as React from 'react'
import { Background } from './background.tsx'
import kitchen from '../assets/background/kitchen.png'
import { Character } from './character.tsx'
import chiefPath from '../assets/characteres/chief.png'
import fmcPath from '../assets/characteres/fmc.png'
import { Dialog } from './dialog.tsx'
import { useState } from 'react'

type SceneProps = {
  sceneId: string
}

type Characters = 'chief' | 'fmc'

const characters: Record<Characters, string> = {
  chief: chiefPath,
  fmc: fmcPath,
}

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

export const Scene = ({ sceneId }: SceneProps): React.ReactElement => {
  console.log(sceneId)
  const [slideIndex, setSlideIndex] = useState(0)

  const onClick = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1)
    }
  }
  const slide = slides[slideIndex]

  return (
    <div className='scene' onClick={onClick}>
      <Background path={kitchen} />
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
