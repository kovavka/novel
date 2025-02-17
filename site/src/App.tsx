import './App.css'
import { Scene } from './components/scene.tsx'
import { preloadImages } from './images.ts'
import { useEffect, useState } from 'react'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    preloadImages().then(() => setIsLoaded(true))
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className='app'>
      <Scene sceneId='0' />
    </div>
  )
}

export default App
