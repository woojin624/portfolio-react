import { GAME_LOADED_FAILURE, GAME_LOADED_SUCEESS, GAME_LOADED_REQUEST } from './types';

const initialState = {
  games: [],
  loading: true,
  err: null,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_LOADED_REQUEST:
      return { ...state, loading: true };

    case GAME_LOADED_SUCEESS:
      return { ...state, games: action.payload, loading: false };

    case GAME_LOADED_FAILURE:
      return { ...state, err: action.payload, loading: false };

    default:
      return state;
  }
};

export default gamesReducer;
