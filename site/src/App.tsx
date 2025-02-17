import './App.css'
import { Scene } from './components/scene.tsx'
import { preloadImages } from './images.ts'
import { useEffect, useState } from 'react'
import { ChapterEnd } from './components/chapter-end.tsx'

const scenes = [0]

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)

  useEffect(() => {
    preloadImages().then(() => setIsLoaded(true))
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  const onSceneFinish = () => {
    setSceneIndex(sceneIndex + 1)
  }

  return (
    <div className='app'>
      {sceneIndex < scenes.length ? (
        <Scene sceneId='0' onFinish={onSceneFinish} />
      ) : (
        <ChapterEnd />
      )}
    </div>
  )
}

export default App
