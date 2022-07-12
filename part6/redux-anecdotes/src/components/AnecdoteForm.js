import React from 'react'
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (event) => {
    event.preventDefault();
    const value = event.target.anecdoteInput.value;
    dispatch(createAnecdote(value));
    dispatch(notification(`created ${value}`))
    setTimeout(() => dispatch(removeNotification()), 5000);
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

export default AnecdoteForm
