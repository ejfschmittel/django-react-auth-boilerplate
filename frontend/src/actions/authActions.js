import * as types from "./types/authTypes"
import {history} from "reducers/store"

import {get, post} from "actions/helpers/fetch"

import {
  getJWTToken,
  setJWTToken,
  removeJWTToken,
  decodeJwt,
  isAliveToken,
  shouldRefreshToken,
} from "actions/helpers/jwt"

/* URL CONSTANTS  */

const BASE_URL = 'http://127.0.0.1:8000';
const BASE_API_URL = BASE_URL + '/api/';


/* AUTH REQUEST SHORTCUTS */

export const aPost = (url, options, data=undefined) => (dispatch) => dispatch(authRequest(post, url, options, data))
export const aGet = (url, options, data=undefined) => (dispatch) => dispatch(authRequest(get, url, options, data))


/* MAIN ACTION CREATORS */
const startAuthProcess = () => ({
    type: types.START_AUTH_PROCESS,
    payload: true
})

const signUpSuccess = (data) => ({
    type: types.SIGN_UP_SUCCESS,
    payload: {
      user: data,
      loading: false
    }
})

const loginSuccess = (data) => {
  setJWTToken(data.token)
  return{
    type: types.LOGIN_SUCCESS,
    payload: {
      ...data,
      loading: false,
      isAuthenticated: true,
    }
  }
}

const setAuthError = (errors) => ({
  type: types.SET_AUTH_ERROR,
  payload: {
    errors,
    loading: false
  }
})

export const logout = () => {
  removeJWTToken();

  return {
    type: types.LOGOUT,
    payload: {
      user: null,
      token: null,
      loading: false,
      isAuthenticated: false
    }
  }
}


/* COMPOSITE ACTIONS */

export const signUpUser = (data) => (dispatch) => {
    const url = BASE_API_URL + 'users/'

    dispatch(startAuthProcess())

    post(url,{}, data).then(
      response => dispatch(signUpSuccess(response)), 
      error => error.response.json().then(e => dispatch(setAuthError(e)))
    )
}


export const loginUser = (data, redirectUrl=undefined) => (dispatch) => {
  const url = BASE_API_URL + 'users/login/'

  dispatch(startAuthProcess())

  post(url,{}, data).then(
    response => { 
      dispatch(loginSuccess(response))
      if(redirectUrl) history.push(redirectUrl)
    },
    error => error.response.json().then(e => dispatch(setAuthError(e)))
  )
}

export const redirectToLogin = (url=undefined) => (dispatch) => {
  dispatch(logout()) 
  history.push("/users/login/", {referrer: url})
}


export const checkAuth = () => (dispatch, getState) => {
    const {isAuthenticated} = getState().auth
    const token = getJWTToken()
    const decodedToken = decodeJwt(token)
    const shouldRefresh = shouldRefreshToken(decodedToken)
    const tokenIsAlive = isAliveToken(decodedToken)

    if(token && tokenIsAlive && shouldRefresh){
      return dispatch(refreshToknen())
    }else if(!isAuthenticated && token && tokenIsAlive && !shouldRefresh){
      dispatch(loginSuccess({token: token}))
      return Promise.resolve({checked: true, msg: "user auto login"})
    }else if(!token || !tokenIsAlive){
      console.log("hello")
      return Promise.resolve({checked: false})
    }else{
      return Promise.resolve({checked: true, msg: "user is logged in"})
    }
}

const refreshToknen = () => (dispatch) => {
  const url = BASE_API_URL + "users/refresh_token/"
  return post(url, {}, {token: getJWTToken()}).then(
    response => { 
      dispatch(loginSuccess(response))
      return {checked: true}
    },
    error => error.response.json().then(e => ({checked: false, error: e}))
  )
}


/* 
dispatch(aPost(url, {}, data)).then(
    res => console.log(res),
    error => error.response.json().then(e => console.log(e))
  ) 
*/
const authRequest = (func, url, options, data) => (dispatch) => {
  return dispatch(checkAuth()).then(
    checkAuth => {
      if(checkAuth.checked){
        const newOptions = {...options, headers: getAuthHeaders()}
        console.log("in here")
        return func(url, newOptions,data)
      }else{
        dispatch(redirectToLogin(history.location.pathname))
      }
    },
    err => console.log("error")
  )
}

const getAuthHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',  
  'Authorization': 'JWT ' + getJWTToken(),
})








