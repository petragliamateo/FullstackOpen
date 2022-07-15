import { createStore } from 'redux';
import appReducer from './reducer/appReducer';

const store = createStore(appReducer);

export default store;
