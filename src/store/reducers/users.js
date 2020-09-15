import { FETCH_USERS_START, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, FETCH_USER_SUCCESS, FETCH_USER_START } from "../actions/actionTypes";

const initialState = {
    users: [],
    loading: false,
    error: null,
    user: []

}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_USERS_START:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.users,
        };
        case FETCH_USER_START:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.user,
        };
      case FETCH_USERS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
        
      default:
        return state;
    }
  }
  