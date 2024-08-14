import { useState } from 'react'
import './App.css'
import Game from './components/Game'
import Scoreboard from './components/Socreboard'

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <div className='app'>
      <Game score={score} setScore={setScore} highScore={highScore} setHighScore={setHighScore} />
      <Scoreboard score={score} highScore={highScore} />
    </div>
  )
}

export default App
