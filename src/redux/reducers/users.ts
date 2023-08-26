import * as actionTypes from '../actionsTypes';

export type UsersState = {
  profile: any;
};

const INITIAL_STATE: UsersState = {
  profile: null,
};

const usersReducer = (state = INITIAL_STATE, action: any) => {
  const payload = action.payload || {};
  switch (action.type) {
    case actionTypes.LOGGED_OUT:
      return {
        ...INITIAL_STATE,
      };
    case actionTypes.LOGGED_IN: {
      return {
        ...state
      };
    }
    case actionTypes.GOT_USER_PROFILE:
      return {
        ...state,
        profile: {...state.profile},
      };
  }
  return state;
};

export default usersReducer;
