import { combineReducers } from 'redux';
import projects from './projects/reducers';
import user from './users/reducers';

const rootReducer = combineReducers({
  projects,
  user,
});

export default rootReducer;
