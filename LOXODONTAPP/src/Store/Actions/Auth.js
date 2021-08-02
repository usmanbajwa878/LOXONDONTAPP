import {
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGIN_FULLFILLED,
  FORGET_PASSWORD_PENDING,
  FORGET_PASSWORD_REJECTED,
  FORGET_PASSWORD_FULLFILLED,
  LOGOUT,
} from '../ActionTypes/AcionTypes';
import actions from '../../Services';

export const actionlogin = data => {
  return async dispatch => {
    try {
      dispatch({
        type: LOGIN_PENDING,
        payload: {
          loading: true,
        },
      });
      let response = await actions.createNetworkRequest('POST', 'login', data);
      console.log('response in Login Action', response);
      if (response.success) {
        dispatch({
          type: LOGIN_FULLFILLED,
          data: response.data,
        });
      } else {
        dispatch({
          type: LOGIN_REJECTED,
          payload: {
            loading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_REJECTED,
        payload: {
          loading: false,
        },
      });
    }
  };
};

export const actionForgetPassword = data => {
  return async dispatch => {
    try {
      dispatch({
        type: FORGET_PASSWORD_PENDING,
        payload: {
          loading: true,
        },
      });
      let response = await actions.createNetworkRequest(
        'POST',
        'forgetPassword',
        data,
      );
      console.log('response in forget password Action', response);
      if (response.success) {
        dispatch({
          type: FORGET_PASSWORD_FULLFILLED,
          data: response.data,
        });
      } else {
        dispatch({
          type: FORGET_PASSWORD_REJECTED,
          payload: {
            loading: false,
            error:response.error
          },
        });
        throw new Error(response.error)
      }
    } catch (error) {
      dispatch({
        type: FORGET_PASSWORD_REJECTED,
        payload: {
          loading: false,
          error:response.error
        },
      });
    }
  };
};



export const actionLogout = () => {
  return {type: LOGOUT};
};

export const actionFileUpload = data => {
  return async dispatch => {
    const response = await actions.createFileUploadNetworkRequest(
      'POST',
      'fileUpload',
      data,
    );
    console.log(response);
    dispatch({
      type: FILE_UPLOAD,
      data: response.data,
      error: response.message,
      success: response.success,
    });
    return response;
  };
};
