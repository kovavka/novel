import './App.css'
import { Scene } from './components/scene.tsx'
import { preloadImages } from './images.ts'
import { useEffect, useState } from 'react'
import { ChapterEnd } from './components/chapter-end.tsx'
import { Story } from 'inkjs'
import chapter1 from './assets/chapters/1.json'

const scenes = [0]

function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [story, setStory] = useState<Story | undefined>(undefined)
  const [sceneIndex, setSceneIndex] = useState(0)

  useEffect(() => {
    preloadImages().then(() => setImagesLoaded(true))

    const story = new Story(chapter1)
    setStory(story)

    // todo should activate after chapter title click
    story.Continue()

    document.body.style.setProperty('--viewport-available-height', `${window.innerHeight}px`)
  }, [])

  if (!imagesLoaded || story === undefined) {
    return <div>Loading...</div>
  }

  const onSceneFinish = () => {
    setSceneIndex(sceneIndex + 1)
  }

  return (
    <div className='app'>
      {sceneIndex < scenes.length ? (
        <Scene story={story} onFinish={onSceneFinish} />
      ) : (
        <ChapterEnd />
      )}
    </div>
  )
}

export default App
