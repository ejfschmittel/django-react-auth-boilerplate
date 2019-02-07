import * as types from "actions/authTypes"

const INITIAL_STATE = {
    token: null,
    user: null,
    loading: false,
    errors: null,
    isAuthenticated: false,
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.SIGN_UP_SUCCESS :
            return {...state, ...action.payload }
        case types.LOGIN_SUCCESS : 
            return {...state, ...action.payload}
        case types.LOGOUT:
            return {...state, ...action.payload}
        case types.SET_AUTH_ERROR:
            return {...state, ...action.payload}
        case types.START_AUTH_PROCESS:
            return {...state, loading: action.payload}
        default:
            return state
    }
}

export default authReducer