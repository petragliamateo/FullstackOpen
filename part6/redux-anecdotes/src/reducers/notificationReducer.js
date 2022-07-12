const initialState = 'Notification'

const notificationReducer = (state = initialState, { type, payload }) => {
  console.log('notification');
  /*
  switch (type) {
    
    case first:
      return { ...state, ...payload }
      
      default:
      }
      */
  return state
}

export default notificationReducer;
