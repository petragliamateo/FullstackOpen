import React from 'react'
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const create = (event) => {
    event.preventDefault();
    const value = event.target.anecdoteInput.value;
    props.createAnecdote(value)

    props.setNotification(`created ${value}`, 5)
    event.target.anecdoteInput.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdoteInput' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);
