import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [serverInfo, setServerInfo] = useState({
    hostname: 'Loading...',
    timestamp: new Date().toISOString()
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch('http://localhost:3000/api/server-info')
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
      <h1>React App con Load Balancer</h1>
      <div className="card">
        <p style={{ visibility: loading ? 'visible' : 'hidden', minHeight: '1.2em' }}>
          Actualizando información...
        </p>        
        {error && <p className="error">{error}</p>}
        <p>
          Servidor: <strong>{serverInfo.hostname}</strong>
        </p>
        <p>
          Hora: {serverInfo.timestamp}
        </p>
      </div>
    </div>
  )
}

export default App
