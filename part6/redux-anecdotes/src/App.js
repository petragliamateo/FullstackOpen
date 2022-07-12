import React from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { getAll } from './services/anecdoteService'
import { initData } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    getAll().then((data) => {
      console.log(data);
      dispatch(initData(data));
    })
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App