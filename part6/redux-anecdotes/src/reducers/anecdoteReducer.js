import { getAll, postAnecdote, putAnecdote } from "../services/anecdoteService"

const initialState = []
const getId = () => (100000 * Math.random()).toFixed(0)

export const voteAnecdote = (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return async (dispatchEvent) => {
    await putAnecdote(newAnecdote);
    dispatchEvent({
      type: 'VOTE_ANECDOTE',
      data: {
        id: anecdote.id,
      },
    })
  }
} 

export const createAnecdote = (content) => {
  const newAnecdote = {content, id: getId(), votes: 0}
  return async (dispatchEvent) => {
    await postAnecdote(newAnecdote);
    dispatchEvent({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  } 
}

export const initData = () => {
  return async (dispatchEvent) => {
    const data = await getAll()
    dispatchEvent({
      type: 'INIT_ANECDOTES',
      data: data,
    })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const newState = state.map((a) => (
        a.id === action.data.id ? {...a, votes: a.votes + 1} : a
      ));
      return newState;

    case 'CREATE_ANECDOTE':
      return state.concat(action.data);

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      break;
  }

  return state
}

export default reducer