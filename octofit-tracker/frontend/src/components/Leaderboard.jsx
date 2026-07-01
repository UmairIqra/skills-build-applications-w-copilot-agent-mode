import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME || window.location.hostname.split('-8000')[0].split('.')[0];
const apiBaseUrl = codespaceName && codespaceName !== 'localhost'
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/leaderboard`)
      .then((res) => res.json())
      .then((data) => setLeaders(data))
      .catch((error) => console.error('Failed to fetch leaderboard:', error));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map((leader) => (
          <li key={leader._id}>
            {leader.name} - {leader.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
