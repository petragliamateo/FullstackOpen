import { useApolloClient, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient();
  const logout = () => {
    setPage('authors');
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }
  
  const result = useQuery(GET_USER);
  const user = result.loading ? {} : result.data.me;
  console.log(user);

  useEffect(() => {
    if(!token) {
      setToken(localStorage.getItem('user-token'));
    }
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
      <Books show={page === 'recommended'} favoriteGenre={user.favoriteGenre} />
    </div>
  )
}

export default App
