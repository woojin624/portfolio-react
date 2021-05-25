import { combineReducers } from 'redux';
import projects from './projects/reducers';
import games from './games/reducers';
import user from './users/reducers';

const rootReducer = combineReducers({
  projects,
  games,
  user,
});

export default rootReducer;
