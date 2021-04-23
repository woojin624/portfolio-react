import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [logger, thunk, promiseMiddleware];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
