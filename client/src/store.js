import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'; // Gets the State from the reducer(s)

const mode = localStorage.getItem('mode');

const initialState = {
    todos: {
        test: 'test '
    }
}

let store;
let composeEnhancers;

if (mode === 'dev' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    console.info('Running in dev mode with redux devtools...')
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    store = createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(thunk)
))
} else {
    console.info('Running in ' + mode + ' mode...')
    store = createStore(reducer, initialState, applyMiddleware(thunk))
}
console.info('Initial Store: ', store.getState())
window.store = store

export default store
