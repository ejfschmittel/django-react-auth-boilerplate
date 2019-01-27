
import {REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS} from "./authTypes"
import {FORM_ERRORS} from "./formTypes"

import {
  get,
  post,
  update,
  put,
  patch,
  del
} from "actions/fetch"

const BASE_URL = 'http://127.0.0.1:8000';
const BASE_API_URL = BASE_URL + '/api/';

export const getRefreshToken = () => localStorage.getItem('jwt_token')
export const setRefreshToken = (token) => localStorage.setItem('jwt_token', token )

/* add auth requests here */

export const aget = (url, options, data=undefined) => get(url, {...options, headers: getAuthHeaders() }, data)
export const apost = (url, options, data=undefined) => post(url, {...options, headers: getAuthHeaders() }, data)
export const aupdat = (url, options, data=undefined) => update(url, {...options, headers: getAuthHeaders() }, data)
export const aput = (url, options, data=undefined) => put(url, {...options, headers: getAuthHeaders() }, data)
export const apatch = (url, options, data=undefined) => patch(url, {...options, headers: getAuthHeaders() }, data)
export const adelete = (url, options, data=undefined) => del(url, {...options, headers: getAuthHeaders() }, data)

const getAuthHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',  
    'Authorization': 'JWT ' + getRefreshToken(),
  }
}

/* action creators */

const registerUserSuccess = (dispatch, response) => {
  return dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: response
  })
}

const loginUserSuccess = (dispatch, response) => {
  return dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: response
  }) 
}

const formError = (dispatch, error) => {
  error.response.json().then(
    (data) => dispatch({
      type: FORM_ERRORS,
      payload: data,
    })
  )  
}

/* actions */

export const registerUser = (data) => (dispatch) => {
    const url = BASE_API_URL + 'users/'

    return post(url,{}, data).then(
      response => registerUserSuccess(dispatch, response), 
      error => formError(dispatch, error)
    )
}

export const loginUser = (data) => (dispatch) => {
  const url = BASE_API_URL + 'users/login/'

  post(url,{}, data).then(
    response => {
      setRefreshToken(response.token)
      loginUserSuccess(dispatch, response)
      //redirect
    },
    error => formError(dispatch, error)
  )
}


export const redirectToLogin = () => null

export const authenticate = async () => {
  const token = getRefreshToken()
  if(token){

  }
}



