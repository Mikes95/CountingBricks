import { actionTypes as types, urls } from '../constants'
import { post } from '../helpers'

export const signup = ({ email, password }) => dispatch => {
  dispatch({ type: types.SIGNUP_REQUEST })
  post({
    url: urls.SIGNUP,
    body: { email, password },
    success: types.SIGNUP_SUCCESS,
    failure: types.SIGNUP_FAILURE,
    dispatch,
  })
}

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: types.LOGIN_REQUEST })
  post({
    url: urls.LOGIN,
    body: { email, password },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  })
}

export const loginWithToken = () => (dispatch, getState) => {
  const token = getState().user.token

  if (typeof token === 'undefined') return

  dispatch({ type: types.LOGIN_REQUEST })
  post({
    url: urls.LOGIN_WITH_TOKEN,
    body: { token },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  })
}


export const sendPicture = foto => dispatch => {
  console.log('Upload')
  var data = { 'data': foto }
  fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
    mode: 'cors',
  })
    //.then((response) => status = response.status)
    .then(response => response.json())

    .then(response =>
      
      dispatch({
        type: 'SET_CLASS',
        payload: response,
      }),
    )
    .catch(err => {
      dispatch({
        //type: 'SET_ERROR',
        //payload: err,
      })
    })

}