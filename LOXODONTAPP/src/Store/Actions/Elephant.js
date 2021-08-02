import {
  CREATE_ELEPHANT_PENDING,
  CREATE_ELEPHANT_REJECTED,
  CREATE_ELEPHANT_FULLFILLED,
  GET_ALL_ELEPHANTS_PENDING,
  GET_ALL_ELEPHANTS_REJECTED,
  GET_ALL_ELEPHANTS_FULLFILLED,
  FIND_SPECIFIC_ELEPHANT_PENDING,
  FIND_SPECIFIC_ELEPHANT_FULLFILLED,
  FIND_SPECIFIC_ELEPHANT_REJECTED
} from '../ActionTypes/AcionTypes';
import actions from '../../Services';

export const actionCreateElephant = data => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_ELEPHANT_PENDING,
        payload: {
          loading: true,
        },
      });
      let response = await actions.createNetworkRequest('POST', 'createElephant', data);
      console.log('response in Create Elephant', response);
      if (response.success) {
        dispatch({
          type: CREATE_ELEPHANT_FULLFILLED,
          data: response.data,
        });
      } else {
        dispatch({
          type: CREATE_ELEPHANT_REJECTED,
          payload: {
            loading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_ELEPHANT_REJECTED,
        payload: {
          loading: false,
        },
      });
    }
  };
};


export const actionGetAllElephants = () => {
    return async dispatch => {
      try {
        dispatch({
          type: GET_ALL_ELEPHANTS_PENDING,
          payload: {
            loading: true,
          },
        });
        let response = await actions.createNetworkGetRequest('GET', 'getAllElephant', null);
        console.log('response in get Elephant', response);
        if (response.success) {
          dispatch({
            type: GET_ALL_ELEPHANTS_FULLFILLED,
            data: response.data,
          });
        } else {
          dispatch({
            type: GET_ALL_ELEPHANTS_REJECTED,
            payload: {
              loading: false,
            },
          });
        }
      } catch (error) {
          console.log("ERR",error)
        dispatch({
          type: GET_ALL_ELEPHANTS_REJECTED,
          payload: {
            loading: false,
          },
        });
      }
    };
  };



export const actionFindSpecificElephant = data => {
    return async dispatch => {
      try {
        dispatch({
          type: FIND_SPECIFIC_ELEPHANT_PENDING,
          payload: {
            loading: true,
          },
        });
        let response = await actions.createNetworkRequest('POST', 'getSpecfic', data);
        console.log('response in Specific Elephant', response);
        if (response.success) {
          dispatch({
            type: FIND_SPECIFIC_ELEPHANT_FULLFILLED,
            data: response.data,
          });
        } else {
          dispatch({
            type: FIND_SPECIFIC_ELEPHANT_REJECTED,
            payload: {
              loading: false,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: FIND_SPECIFIC_ELEPHANT_REJECTED,
          payload: {
            loading: false,
          },
        });
      }
    };
  };
  
  
