const initialState = ''

export const notification = (text) => {
  return {
    type: 'NOTIFICATION',
    payload: {
      notification: text,
    }
  }
}

export const removeNotification =  () => ({ type: 'REMOVE' })

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'NOTIFICATION':
      return payload.notification;

    case 'REMOVE':
      return '';
      
      default:
      }

  return state
}

export default notificationReducer;
