/* eslint-disable default-param-last */
const initialState = {
  blogs: [],
  user: {},
  notification: {},
};

export const setItem = (item, value) => ({ type: 'SET_ITEM', payload: { [item]: value } });
// setItem(user, [...])

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_ITEM':
      return { ...state, ...payload };

    default:
      return state;
  }
};
