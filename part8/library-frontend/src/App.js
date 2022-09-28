import { useApolloClient, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  const client = useApolloClient();
  const logout = () => {
    setPage('authors');
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setUser({});
  }
  
  const [getUser, result] = useLazyQuery(GET_USER);
  const setterUser = async () => {
    if(user.username){
      return;
    }
    await getUser();
    if(result.data) {
      setUser(result.data.me || {})
    }
  }

  useEffect(() => {
    console.log('app effect');
    setterUser();
    if(!token) {
      setToken(localStorage.getItem('user-token'));
    }
  }, [result.data])

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
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} getUser={setterUser} />
      <Recommended show={page === 'recommended'} favoriteGenre={user.favoriteGenre} />
    </div>
  )
}

export default App
