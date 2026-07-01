import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME || window.location.hostname.split('-8000')[0].split('.')[0];
const apiBaseUrl = codespaceName && codespaceName !== 'localhost'
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/activities`)
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error('Failed to fetch activities:', error));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {activity.type} ({activity.durationMinutes} min, {activity.calories} cal)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
