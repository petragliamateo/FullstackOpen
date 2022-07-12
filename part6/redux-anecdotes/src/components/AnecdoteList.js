import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const { anecdotes } = props;

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted ${anecdote.content}`, 3)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

function mapStateToProps(state) {
  const anecdotes = state.anecdotes
  anecdotes.sort((a, b) => b.votes - a.votes)
  return {
    anecdotes: anecdotes.filter((a) => a.content.includes(state.filter))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
