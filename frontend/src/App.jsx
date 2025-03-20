import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [serverInfo, setServerInfo] = useState({
    hostname: 'Loading...',
    talk: 'Loading...'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch('http://localhost:3000/ping')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setServerInfo(data);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching server info:', error);
          setError('Error conectando al servidor');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
    
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Ping Pong -inator</h1>
      <div className="card">
        <p style={{ visibility: loading ? 'visible' : 'hidden', minHeight: '1.2em' }}>
          Performing complex algorithms
        </p>
        {error && <p className="error">{error}</p>}
        <p>
          Server hostname: <strong>{serverInfo.hostname}</strong>
        </p>
        <p>
          Ping?: {serverInfo.message}
        </p>
      </div>
    </div>
  )
}

export default App
