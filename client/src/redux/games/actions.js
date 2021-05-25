import { GAME_LOADED_FAILURE, GAME_LOADED_SUCEESS, GAME_LOADED_REQUEST } from './types';
import axios from 'axios';

const loadingSuccess = (data) => {
  return {
    type: GAME_LOADED_SUCEESS,
    payload: data,
  };
};

const loadingFailure = (err) => {
  return {
    type: GAME_LOADED_FAILURE,
    payload: err,
  };
};

const loadingRequest = () => {
  return {
    type: GAME_LOADED_REQUEST,
  };
};

// 프로젝트 목록을 디스패치로 받아와 스토어에 저장하는 부분
export const loadingGames = () => {
  return (dispatch) => {
    dispatch(loadingRequest());
    axios
      .get('/api/gamerank')
      .then((response) => response.data)
      .then((data) => dispatch(loadingSuccess(data)))
      .catch((err) => {
        dispatch(loadingFailure(err));
      });
  };
};
