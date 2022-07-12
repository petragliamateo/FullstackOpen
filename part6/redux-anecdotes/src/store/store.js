import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer,
})

export const store = createStore(
  reducer,
  composeWithDevTools()  
);
