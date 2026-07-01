import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME || window.location.hostname.split('-8000')[0].split('.')[0];
const apiBaseUrl = codespaceName && codespaceName !== 'localhost'
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Failed to fetch users:', error));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
