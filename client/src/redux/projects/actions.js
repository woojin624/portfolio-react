import { GLOBAL_LOADED_FAILURE, GLOBAL_LOADED_SUCEESS, GLOBAL_LOADED_REQUEST } from './types';
import axios from 'axios';

const loadingSuccess = (data) => {
  return {
    type: GLOBAL_LOADED_SUCEESS,
    payload: data,
  };
};

const loadingFailure = (err) => {
  return {
    type: GLOBAL_LOADED_FAILURE,
    payload: err,
  };
};

const loadingRequest = () => {
  return {
    type: GLOBAL_LOADED_REQUEST,
  };
};

// 프로젝트 목록을 디스패치로 받아와 스토어에 저장하는 부분
export const loadingProjects = () => {
  return (dispatch) => {
    dispatch(loadingRequest());
    axios
      .get('/api/projects/list')
      .then((response) => response.data)
      .then((data) => dispatch(loadingSuccess(data)))
      .catch((err) => {
        dispatch(loadingFailure(err));
      });
  };
};
