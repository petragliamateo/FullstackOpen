const initialState = []
const getId = () => (100000 * Math.random()).toFixed(0)

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const createAnecdote = (value) => {
  return {
    type: 'CREATE',
    data: {
      value: value
    }
  }
}

export const initData = (data) => ({ type: 'INIT_ANECDOTES', data })

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const newState = state.map((a) => (
        a.id === action.data.id ? {...a, votes: a.votes + 1} : a
      ));
      return newState;

    case 'CREATE':
      const newAnecdote = {
        content: action.data.value,
        id: getId(),
        votes: 0,
      };
      return state.concat(newAnecdote);

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      break;
  }

  return state
}

export default reducer