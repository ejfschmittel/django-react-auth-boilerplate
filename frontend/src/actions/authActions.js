import * as types from "./authTypes"




import {
  get,
  post
} from "actions/fetch"

const BASE_URL = 'http://127.0.0.1:8000';
const BASE_API_URL = BASE_URL + '/api/';


/* add auth requests here */

const aPost = (url, options, data=undefined) => (dispatch) => dispatch(authRequest(post, url, options, data))
const aGet = (url, options, data=undefined) => (dispatch) => dispatch(authRequest(get, url, options, data))





/* utils */

const TOKEN_NAME = "jwt_token"

const getJWTToken = () => localStorage.getItem(TOKEN_NAME)
const setJWTToken = (token) => localStorage.setItem(TOKEN_NAME, token )
const removeJWTToken = () => localStorage.removeItem(TOKEN_NAME)
//export const isAuthenticated = () => !!getJWTToken()

const decodeJwt = (token) => {
  if(!token) return null
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const isAliveToken = (decodedToken) => {
  if(!decodedToken) return false
  const now = Date.now().valueOf() / 1000

  if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now) 
    return false
  return true
}

const REFRESH_DELTA = 60 * 10  // 10min

export const shouldRefreshToken = (decodedToken) => {
  if(!decodedToken) return false
  const now = Date.now().valueOf() / 1000

  if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now + REFRESH_DELTA) 
    return true
  return false
}


const getAuthHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',  
  'Authorization': 'JWT ' + getJWTToken(),
})



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

//make redirect to login

/* COMPOSITE ACTIONS */

/*export const redirectToLogin = (url=null) => (dispatch) => {
  history.push("/users/login/")
  dispatch(setLoginReturnUrl(url))
  dispatch(logout())
  
}*/

export const signUpUser = (data) => (dispatch) => {
    const url = BASE_API_URL + 'users/'

    dispatch(startAuthProcess())

    post(url,{}, data).then(
      response => dispatch(signUpSuccess(response)), 
      error => error.response.json().then(e => dispatch(setAuthError(e)))
    )
}

import history from "reducers/history"

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

const TestAction = () => ({
  type: "TEST",
  payload: null
})

//check if valid token exists and sets it
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
      return {checked: true, msg: "user auto login"}
    }else if(!token || !tokenIsAlive){
      return {checked: false, msg: "auto login not possible"}
    }else{
      return {checked: false, msg: "user is logged in"}
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

const authRequest = (func, url, options, data) => (dispatch) => {
  console.log("here")
  return dispatch(checkAuth()).then(
    checkAuth => {
      if(checkAuth.checked){
        const newOptions = {...options, headers: getAuthHeaders()}
        return func(url, newOptions,data)
      }else{

      }
    }
  )
}






/* dispatch(aPost(url, {}, data)).then(
    res => console.log(res),
    error => error.response.json().then(e => console.log(e))
  ) */