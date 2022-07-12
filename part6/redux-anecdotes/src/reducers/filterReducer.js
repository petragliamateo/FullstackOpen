const initialState = ''

export const setFilter = (text) => ({
  type: 'FILTER',
  payload: {
    text,
  },
})

const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case 'FILTER':
    return payload.text;

  default:
    return state
  }
}

export default filterReducer;