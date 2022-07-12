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
      content: value,
      id: getId(),
      votes: 0,
    }
  }
}

export const initData = (data) => ({ type: 'INIT_ANECDOTES', data })

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const newState = state.map((a) => (
        a.id === action.data.id ? {...a, votes: a.votes + 1} : a
      ));
      return newState;

    case 'CREATE':
      return state.concat(action.data);

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      break;
  }

  return state
}

export default reducer