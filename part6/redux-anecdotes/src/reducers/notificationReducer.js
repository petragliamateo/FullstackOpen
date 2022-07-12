const initialState = {}
const getId = () => (100000 * Math.random()).toFixed(0)

export const setNotification = (text, sec) => {
  const transId = getId();
  return async (dispatchEvent) => {
    dispatchEvent({
      type: 'NOTIFICATION',
      payload: {
        notification: text,
        transId,
      }
    })
    await new Promise((r) => setTimeout(r, sec * 1000))
    dispatchEvent({
      type: 'REMOVE',
      payload: {
        notification: text,
        transId,
      }
    })
  }
}

const notificationReducer = (state = initialState, { type, payload }) => {
  console.log(state);
  switch (type) {
    case 'NOTIFICATION':
      return {...state, ...payload};

    case 'REMOVE':
      return payload.transId === state.transId ? {...state, notification: ''} : state;
      
      default:
      }

  return state
}

export default notificationReducer;
