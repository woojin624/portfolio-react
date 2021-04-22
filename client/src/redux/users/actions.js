import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';
import axios from 'axios';

export const loginUser = (dataToSubmit) => {
  const request = axios
    .post('/api/users/login', dataToSubmit)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = (dataToSubmit) => {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const auth = () => {
  const request = axios
    .get('/api/users/auth')
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return {
    type: AUTH_USER,
    payload: request,
  };
};
