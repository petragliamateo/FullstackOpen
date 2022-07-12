import React from 'react'
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notification, removeNotification } from '../reducers/notificationReducer';
import { postAnecdote } from '../services/anecdoteService';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (event) => {
    event.preventDefault();
    const value = event.target.anecdoteInput.value;
    postAnecdote(createAnecdote(value).data).then(() => {
      dispatch(createAnecdote(value));
      dispatch(notification(`created ${value}`))
      event.target.anecdoteInput.value = ''
    })
    setTimeout(() => dispatch(removeNotification()), 5000);
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
