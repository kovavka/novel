import React, { useEffect } from 'react'
import { Background } from './background.tsx'
import { Character } from './character.tsx'
import { Dialog } from './dialog.tsx'
import { useState } from 'react'
import { backgroundSprites, characterSprites } from '../images.ts'
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
    text: '...',
    options: ['(Извиниться)', '(Оправдаться)'],
  },
  {
    name: 'Героиня',
    text: 'Простите!',
  },
  {
    name: 'Шеф',
    text: 'Два цезаря, бегом.',
  },
]

export const Scene = ({ onFinish }: SceneProps): React.ReactElement => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [animationExit, setAnimationExit] = useState(false)

  const onClick = () => {
    if (animationExit || isOptionDialog) {
      return
    }

    if (slideIndex < slides.length - 1) {
      setAnimationExit(true)
    } else {
      onFinish()
    }
  }

  useEffect(() => {
    if (animationExit) {
      document.body.classList.add('animation-exit')
      setTimeout(() => {
        setAnimationExit(false)
        document.body.classList.remove('animation-exit')

        // goToNextSlide
        setSlideIndex(slideIndex + 1)
      }, 250)
    }
  }, [animationExit, slideIndex])

  const slide = slides[slideIndex]
  const isOptionDialog = slide.options !== undefined

  if (slide.name === undefined) {
    return (
      <div className='scene' onClick={onClick}>
        <Background path={backgroundSprites.kitchen} />
        <Description text={slide.text} />
      </div>
    )
  }

  const onOptionClick = () => {
    if (animationExit) {
      return
    }

    // support actual choice
    setAnimationExit(true)
  }

  const spriteName = characterNameSpriteMap[slide.name]

  return (
    <div className='scene' onClick={onClick}>
      <Background path={backgroundSprites.kitchen} />
      <div className='character-container'>
        <Character
          spritePath={characterSprites[spriteName]}
          position={spriteName === 'fmc' ? 'left' : 'right'}
        />
        <Dialog
          key={slideIndex}
          name={slide.name}
          text={slide.text}
          options={slide.options}
          onOptionClick={onOptionClick}
        />
      </div>
    </div>
  )
}
