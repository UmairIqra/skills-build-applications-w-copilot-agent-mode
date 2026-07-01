import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME || window.location.hostname.split('-8000')[0].split('.')[0];
const apiBaseUrl = codespaceName && codespaceName !== 'localhost'
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/teams`)
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error('Failed to fetch teams:', error));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team._id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
