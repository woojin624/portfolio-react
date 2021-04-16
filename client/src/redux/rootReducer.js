import { combineReducers } from 'redux';
import projectsReducer from './projects/reducers';
import userAuth from './users/reducers';

const rootReducer = combineReducers({
  projects: projectsReducer,
  user: userAuth,
});

export default rootReducer;
