const initialState = ''

export const setNotification = (text, sec) => {
  return async (dispatchEvent) => {
    dispatchEvent({
      type: 'NOTIFICATION',
      payload: { notification: text }
    })
    await new Promise((r) => setTimeout(r, sec * 1000))
    dispatchEvent({
      type: 'REMOVE',
      payload: { notification: text }
    })
  }
}

const notificationReducer = (state = initialState, { type, payload }) => {
  console.log(state);
  switch (type) {
    case 'NOTIFICATION':
      return payload.notification;

    case 'REMOVE':
      return payload.notification === state ? '' : state;
      
      default:
      }

  return state
}

export default notificationReducer;
