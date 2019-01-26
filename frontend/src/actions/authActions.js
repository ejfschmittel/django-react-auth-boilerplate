import {post} from "actions/fetch"
import {REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS} from "./authTypes"
import {FORM_ERRORS} from "./formTypes"

const BASE_URL = 'http://127.0.0.1:8000';
const BASE_API_URL = BASE_URL + '/api/';


//Redux update form ???

export const registerUser = (data) => (dispatch) => {
    const url = BASE_API_URL + 'users/'

    

    return post(url,{}, data).then(
      response => dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response
      }), //.then(redirect=>)
      error => {
        return error.response.json().then(
          (data) => dispatch({
            type: FORM_ERRORS,
            payload: data,
          })
        )
      }
    )
}



export const loginUser = (data) => (dispatch) => {
  const url = BASE_API_URL + 'users/login/'

  //TODO: redirect, set local storage

  return post(url,{}, data).then(
    response => {
      localStorage.setItem("jwt_token", response.token)

      return dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response
      }) //.then(redirect=>)
    },
    error => {
      return error.response.json().then(
        (data) => dispatch({
          type: FORM_ERRORS,
          payload: data,
        })
      )
    }
  )
}
