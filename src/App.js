import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
        const res = await fetch(
          `https://api.api-ninjas.com/v1/emoji?name=${searchTerm}`,
          {
            headers: {
              'X-API-Key': 'qBZuwjX8NfzALoxrBxIkgw==ChhTJoBr4o1FloIj'
            }
          }
        );
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
    if(searchTerm.length > 0) {
      fetchData();
    }
  }, [searchTerm])

  return (
    <div className="App">
      <form>
        <label>Search for a emoji:</label>
          <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          />
        </form>
        {isLoading ? (
          <p>Please wait...</p>
        ) : (
          searchResults.map(result => (
            <div key={result.id}>
              <h2>{result.name}</h2>
              <h3>Show your emoji: {result.character}</h3>
            </div>
          ))
        )}
    </div>
  );
}

export default App;
