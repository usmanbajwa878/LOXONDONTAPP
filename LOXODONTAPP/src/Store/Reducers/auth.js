import {
  LOGIN_PENDING,
  LOGIN_FULLFILLED,
  LOGIN_REJECTED,
  LOGOUT
} from '../ActionTypes/AcionTypes';

const initialState = {
  user: null,
  loading: false,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case LOGIN_FULLFILLED:
      return {
        ...state,
        user: action.data,
        didTryAutoLogin: true,
        loading: false,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        loading: action.payload.loading,
      };
      case LOGOUT:
        return initialState
    default:{
      return state
    }
  }
};
