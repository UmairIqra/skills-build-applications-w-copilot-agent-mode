import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import './App.css'

function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>OctoFit Tracker</h1>
      <Activities />
      <Leaderboard />
    </main>
  )
}

export default App
