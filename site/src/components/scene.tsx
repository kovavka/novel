import React, { useEffect, useRef } from 'react'
import { Story } from 'inkjs'
import { Background } from './background.tsx'
import { Character } from './character.tsx'
import { Dialog } from './dialog.tsx'
import { useState } from 'react'
import { backgroundSprites, characterSprites } from '../images.ts'
import { Description } from './description.tsx'
import './scene.css'
import chapter1 from '../assets/chapters/1.json'

type SceneProps = {
  sceneId: string
  onFinish: () => void
}

const characterNameSpriteMap: Record<string, string> = {
  chief: 'Шеф',
  fmc: 'Анна',
}

const story = new Story(chapter1)
// todo move to app -> should activate after chapter title click
story.Continue()

export const Scene = ({ onFinish }: SceneProps): React.ReactElement => {
  const [animationExit, setAnimationExit] = useState(false)
  const continueFnRef = useRef<() => void>(undefined)

  const { currentText = '', currentTags = [], currentChoices } = story
  const characterId =
    currentTags
      .find(x => x.startsWith('character'))
      ?.split(':')[1]
      .trim() ?? ''

  const characterName = characterNameSpriteMap[characterId]
  const options = currentChoices.map(x => ({ index: x.index, text: x.text }))

  const onClick = () => {
    if (animationExit) {
      return
    }

    if (!story.canContinue) {
      if (currentChoices.length > 0) {
        // in dialog option
        return
      } else {
        onFinish()
        return
      }
    }

    continueFnRef.current = () => story.Continue()
    setAnimationExit(true)
  }

  useEffect(() => {
    if (animationExit) {
      document.body.classList.add('animation-exit')
      setTimeout(() => {
        setAnimationExit(false)
        document.body.classList.remove('animation-exit')

        const continueFn = continueFnRef.current
        if (continueFn !== undefined) {
          continueFn()
        }
        continueFnRef.current = undefined
      }, 250)
    }
  }, [animationExit]) // todo add story dependency

  if (characterId === 'author') {
    return (
      <div className='scene' onClick={onClick}>
        <Background path={backgroundSprites.kitchen} />
        <Description text={currentText} />
      </div>
    )
  }

  const onOptionClick = (index: number) => {
    if (animationExit) {
      return
    }

    continueFnRef.current = () => {
      story.ChooseChoiceIndex(index)
      // todo check later
      story.Continue()
    }
    setAnimationExit(true)
  }

  return (
    <div className='scene' onClick={onClick}>
      <Background path={backgroundSprites.kitchen} />
      <div className='character-container'>
        <Character
          // key={spriteName}
          spritePath={characterSprites[characterId]}
          position={characterId === 'fmc' ? 'left' : 'right'}
        />
        <Dialog
          // key={slideIndex}
          name={characterName}
          text={currentText}
          options={options}
          onOptionClick={onOptionClick}
        />
      </div>
    </div>
  )
}
