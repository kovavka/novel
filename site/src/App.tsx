import './App.css'
import { Scene } from './components/scene.tsx'
import { preloadImages } from './images.ts'

preloadImages()

function App() {
  return (
    <div className='app'>
      <Scene sceneId='0' />
    </div>
  )
}

export default App
