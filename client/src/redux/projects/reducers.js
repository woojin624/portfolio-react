import { GLOBAL_LOADED_FAILURE, GLOBAL_LOADED_SUCEESS, GLOBAL_LOADED_REQUEST } from './types';

const initialState = {
  projects: [],
  loading: true,
  err: null,
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_LOADED_REQUEST:
      return { ...state, loading: true };

    case GLOBAL_LOADED_SUCEESS:
      return { ...state, projects: action.payload, loading: false };

    case GLOBAL_LOADED_FAILURE:
      return { ...state, err: action.payload, loading: false };

    default:
      return state;
  }
};

export default projectsReducer;
