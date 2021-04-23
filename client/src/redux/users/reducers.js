/* eslint-disable */

import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

const initialState = {
  userData: {
    isAuth: false,
  },
};

const userAuth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;

    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;

    default:
      return state;
  }
};

export default userAuth;
