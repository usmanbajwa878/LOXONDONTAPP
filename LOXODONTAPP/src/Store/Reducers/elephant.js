import {
  CREATE_ELEPHANT_PENDING,
  CREATE_ELEPHANT_REJECTED,
  CREATE_ELEPHANT_FULLFILLED,
  GET_ALL_ELEPHANTS_PENDING,
  GET_ALL_ELEPHANTS_FULLFILLED,
  GET_ALL_ELEPHANTS_REJECTED,
  FIND_SPECIFIC_ELEPHANT_PENDING,
  FIND_SPECIFIC_ELEPHANT_FULLFILLED,
  FIND_SPECIFIC_ELEPHANT_REJECTED,
} from '../ActionTypes/AcionTypes';

const initialState = {
  elephantList: [],
  updatedElephant: {},
  specificElephants:[],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ELEPHANT_PENDING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case CREATE_ELEPHANT_FULLFILLED:
      return {
        ...state,
        updatedElephant: action.data,
        loading: false,
      };
    case CREATE_ELEPHANT_REJECTED:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case GET_ALL_ELEPHANTS_PENDING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case GET_ALL_ELEPHANTS_FULLFILLED:
      return {
        ...state,
        elephantList: action.data,
        loading: false,
      };
    case GET_ALL_ELEPHANTS_REJECTED:
      return {
        ...state,
        loading: action.payload.loading,
      };
      case FIND_SPECIFIC_ELEPHANT_PENDING:
        return {
          ...state,
          loading: action.payload.loading,
        };
      case FIND_SPECIFIC_ELEPHANT_FULLFILLED:
        return {
          ...state,
          specificElephants: action.data,
          loading: false,
        };
      case FIND_SPECIFIC_ELEPHANT_REJECTED:
        return {
          ...state,
          loading: action.payload.loading,
        };
    default: {
      return state;
    }
  }
};
