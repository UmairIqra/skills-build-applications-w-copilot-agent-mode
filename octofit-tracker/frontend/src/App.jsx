import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>OctoFit Tracker</h1>
      <Activities />
      <Leaderboard />
      <Teams />
      <Users />
      <Workouts />
    </main>
  )
}

export default App
