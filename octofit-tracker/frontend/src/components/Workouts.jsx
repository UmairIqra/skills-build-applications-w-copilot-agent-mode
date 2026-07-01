import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME || window.location.hostname.split('-8000')[0].split('.')[0];
const apiBaseUrl = codespaceName && codespaceName !== 'localhost'
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/workouts`)
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.error('Failed to fetch workouts:', error));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            {workout.title} - {workout.durationMinutes} mins
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
