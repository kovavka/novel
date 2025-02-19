import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Story } from 'inkjs'
import { Background } from './background.tsx'
import { Character } from './character.tsx'
import { Dialog, DialogOption } from './dialog.tsx'
import { useState } from 'react'
import { backgroundSprites } from '../images.ts'
import { Description } from './description.tsx'
import './scene.css'
import { ANIMATIONS_DURATION } from '../variables.ts'
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

type SceneState = {
  character?: {
    id: string
    position: 'left' | 'right'
  }
  text: string
  italicStyle: boolean
  options: DialogOption[]
  locationId: string
}

type SceneInnerProps = SceneState & {
  transitionInProgress: boolean
  onContinue: () => void
  onOptionChoose: (index: number) => void
  infoText?: string
  bgTransition: boolean
}

export const SceneInner = ({
  onContinue,
  onOptionChoose,
  transitionInProgress,
  infoText,
  bgTransition,
  ...restProps
}: SceneInnerProps): React.ReactElement => {
  const prevState = useRef<SceneState>(undefined)

  const onSlideClick = () => {
    if (transitionInProgress) {
      return
    }

    prevState.current = restProps
    onContinue()
  }

  const onOptionClick = (index: number) => {
    if (transitionInProgress) {
      return
    }

    prevState.current = restProps
    onOptionChoose(index)
  }

  const characterChanged = prevState.current?.character !== restProps.character
  const bgChanged = prevState.current?.locationId !== restProps.locationId || bgTransition

  // when transition is in progress, we need to render prev state, so we can hide it with animation
  const state =
    transitionInProgress && prevState.current !== undefined ? prevState.current : restProps

  const { character, text, options, locationId } = state
  const backgroundPath = backgroundSprites[locationId]

  return (
    <div className='scene' onClick={onSlideClick}>
      <Background visible={!(transitionInProgress && bgChanged)} path={backgroundPath} />
      {infoText !== undefined && <Info text={infoText} />}

      {character !== undefined && (
        <div className='character-container'>
          <Character
            visible={!(transitionInProgress && characterChanged)}
            id={character.id}
            position={character.position}
          />

          <Dialog
            visible={!transitionInProgress}
            name={characterNameMap[character.id]}
            text={text}
            italic={state.italicStyle}
            options={options}
            onOptionClick={onOptionClick}
          />
        </div>
      )}

      {character === undefined && <Description visible={!transitionInProgress} text={text} />}
    </div>
  )
}

export const Scene = ({ story, onFinish }: SceneProps): React.ReactElement => {
  const [infoText, setInfoText] = useState<string | undefined>(undefined)
  const [transitionInProgress, setTransitionInProgress] = useState(false)
  const currentLocationRef = useRef<string>('story-main')

  const { currentText, currentTags, currentChoices } = story

  const parsedTags = parseTags(currentTags ?? [])

  const characterId = parsedTags['character']
  const location = parsedTags['location']
  const italicStyle = parsedTags['italic'] !== undefined
  const bgTransition = parsedTags['transition'] !== undefined
  const position = (parsedTags['position'] ?? characterId === 'main') ? 'left' : 'right'

  if (location !== undefined) {
    currentLocationRef.current = location
  }

  const onVariableChange = useCallback((variableName: string, _newValue: any) => {
    // todo need to compare against prev value
    console.log(variableName, variableMap[variableName])
    setInfoText(`${variableMap[variableName]} + 1`)
  }, [])

  useEffect(() => {
    story.ObserveVariable('harsh', onVariableChange)
    story.ObserveVariable('control', onVariableChange)

    return () => {
      story.RemoveVariableObserver(onVariableChange, 'harsh')
      story.RemoveVariableObserver(onVariableChange, 'control')
    }
  }, [story])

  useEffect(() => {
    if (transitionInProgress) {
      setTimeout(() => {
        setTransitionInProgress(false)
      }, ANIMATIONS_DURATION)
    }
  }, [transitionInProgress])

  // todo support queue
  useEffect(() => {
    if (infoText !== undefined) {
      setTimeout(() => {
        setInfoText(undefined)
      }, 2300)
    }
  }, [infoText])

  const onContinue = () => {
    if (story.canContinue) {
      story.Continue()
      setTransitionInProgress(true)
    } else {
      // otherwise we are in dialog option -> do nothing
      if (currentChoices.length === 0) {
        onFinish()
      }
    }
  }

  const onOptionClick = (index: number) => {
    story.ChooseChoiceIndex(index)
    setTransitionInProgress(true)
  }

  // todo memo?
  const options = currentChoices.map(x => ({ index: x.index, text: x.text }))

  const character = useMemo<SceneState['character']>(() => {
    if (characterId !== undefined) {
      return { id: characterId, position }
    }
    return undefined
  }, [characterId, position])

  return (
    <SceneInner
      transitionInProgress={transitionInProgress}
      onContinue={onContinue}
      onOptionChoose={onOptionClick}
      locationId={currentLocationRef.current}
      character={character}
      text={currentText ?? ''}
      italicStyle={italicStyle}
      options={options}
      infoText={infoText}
      bgTransition={bgTransition}
    />
  )
}
