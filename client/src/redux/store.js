import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware([thunk, promiseMiddleware])) : composeWithDevTools(applyMiddleware([logger, thunk, promiseMiddleware]));

const store = createStore(rootReducer, enhancer);

export default store;
