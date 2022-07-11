import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const voteAnecdote = (id) => {
    return {
      type: 'VOTE',
      data: {
        id: id
      }
    }
  }
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  const createAnecdote = (value) => {
    return {
      type: 'CREATE',
      data: {
        value: value
      }
    }
  }
  const create = (event) => {
    event.preventDefault();
    console.log('created', event.target.anecdoteInput.value);
    dispatch(createAnecdote(event.target.anecdoteInput.value));
    event.target.anecdoteInput.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdoteInput' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App