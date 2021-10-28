import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers'; 
const store =  createStore(
  reducer ,
  process.env.MODE === 'production' ? compose(applyMiddleware(thunk)) : composeWithDevTools(applyMiddleware(thunk))
);


export function initializeStore () {
  return store;
}

export const _store = store;
  