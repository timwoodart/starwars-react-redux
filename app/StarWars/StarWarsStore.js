import { applyMiddleware, createStore } from 'redux';
import reducer from './StarWarsReducer';

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
);

export default store;