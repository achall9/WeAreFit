import * as actionTypes from '../actionsTypes';

export const onLoggedIn = (payload: any) => {
  return {
    type: actionTypes.LOGGED_IN,
    payload,
  };
};

export const onLoggedOut = () => {
  return {
    type: actionTypes.LOGGED_OUT,
  };
};

export const onGotUserProfile = (payload: any) => {
  return {
    type: actionTypes.GOT_USER_PROFILE,
    payload,
  };
};

