import React, { useCallback, useEffect, useRef } from 'react'
import { Story } from 'inkjs'
import { Background } from './background.tsx'
import { Character } from './character.tsx'
import { Dialog } from './dialog.tsx'
import { useState } from 'react'
import { backgroundSprites, characterSprites } from '../images.ts'
import { Description } from './description.tsx'
import './scene.css'
import { Info } from './info.tsx'

type SceneProps = {
  story: Story
  onFinish: () => void
}

const characterNameMap: Record<string, string> = {
  chef: 'Минг',
  main: 'Анна',
  waitress: 'Официантка',
  waitress2: 'Официантка',
}

const variableMap: Record<string, string> = {
  harsh: 'Прямолинейность',
  control: 'Сдержанность',
}

function parseTags(tags: string[]): Record<string, string | undefined> {
  return tags.reduce((acc, tag) => {
    if (tag.includes(':')) {
      const [key, value] = tag.split(':')
      return { ...acc, [key.trim()]: value.trim() }
    }

    return { ...acc, [tag]: 'true' }
  }, {})
}

export const Scene = React.memo(({ story, onFinish }: SceneProps): React.ReactElement => {
  const [animationExit, setAnimationExit] = useState(false)
  const [infoText, setInfoText] = useState<string | undefined>(undefined)
  const continueFnRef = useRef<() => void>(undefined)
  const currentLocationRef = useRef<string>('story-main')

  const { currentText, currentTags, currentChoices } = story

  const parsedTags = parseTags(currentTags ?? [])

  const characterId = parsedTags['character']
  const location = parsedTags['location']
  const italicStyle = parsedTags['italic'] !== undefined
  const position = (parsedTags['position'] ?? characterId === 'main') ? 'left' : 'right'

  if (location !== undefined) {
    currentLocationRef.current = location
  }

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

  const onVariableChange = useCallback((variableName: string, newValue: any) => {
    // todo need to compare against prev value
    setInfoText(`${variableMap[variableName]} + 1`)
  }, [])

  useEffect(() => {
    story.ObserveVariables(['harsh', 'control'], [onVariableChange])

    return () => {
      story.RemoveVariableObserver(onVariableChange)
    }
  }, [story])

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

  const backgroundSpriteName = currentLocationRef.current
  const backgroundPath = backgroundSprites[backgroundSpriteName]

  if (parsedTags['narrator'] !== undefined || characterId === undefined) {
    return (
      <div className='scene' onClick={onClick}>
        <Background path={backgroundPath} />
        <Description text={currentText ?? ''} />
      </div>
    )
  }

  const characterName = characterNameMap[characterId]
  const options = currentChoices.map(x => ({ index: x.index, text: x.text }))

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
      <Background path={backgroundPath} />
      {infoText !== undefined && <Info text={infoText} />}

      <div className='character-container'>
        <Character
          key={characterId}
          spritePath={characterSprites[characterId]}
          position={position}
        />
        <Dialog
          // key={slideIndex}
          name={characterName}
          text={currentText ?? ''}
          italic={italicStyle}
          options={options}
          onOptionClick={onOptionClick}
        />
      </div>
    </div>
  )
})
